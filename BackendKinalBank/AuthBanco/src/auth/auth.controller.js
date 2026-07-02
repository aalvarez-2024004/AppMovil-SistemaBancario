'use strict';

import argon2 from 'argon2';
import { User } from '../users/user.model.js';
import { Role } from './role.model.js';
import { generateJWT } from '../../helpers/generate.jwt.js';
import { generateUserId } from '../../helpers/uuid.generator.js';
import { sendPasswordResetCode } from '../../helpers/email.helper.js';

// Almacén temporal en memoria: { email -> { code, expiresAt } }
// En producción deberías usar Redis o guardar en la BD.
const resetCodes = new Map();

const CODE_EXPIRY_MS = 15 * 60 * 1000; // 15 minutos

/** Genera un código numérico de 6 dígitos */
const generateCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();


// ─── REGISTRO ────────────────────────────────────────────────────────────────
export const register = async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      password,
      dpi,
      address,
      phone,
      job,
      monthlyIncome,
    } = req.body;

    if (!password || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'La contraseña tiene que tener mínimo 8 caracteres',
      });
    }

    if (isNaN(monthlyIncome) || Number(monthlyIncome) < 100) {
      return res.status(400).json({
        success: false,
        message: 'Ingresos inválidos',
      });
    }

    if (!name || !username || !email || !password || !dpi || !address || !phone || !job || !monthlyIncome) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios',
      });
    }

    if (!dpi || dpi.length !== 13) {
      return res.status(400).json({
        success: false,
        message: 'El DPI tiene que tener 13 números',
      });
    }

    const exists = await User.findOne({ where: { Email: email } });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Correo ya registrado' });
    }

    const existsUsername = await User.findOne({ where: { Username: username } });
    if (existsUsername) {
      return res.status(400).json({ success: false, message: 'Username ya registrado' });
    }

    const clientRole = await Role.findOne({ where: { Name: 'CLIENT' } });
    const hash = await argon2.hash(password);
    const accountNumber = `ACC-${Date.now()}`;

    const user = await User.create({
      Id: generateUserId(),
      Name: name,
      Username: username,
      Email: email,
      Password: hash,
      DPI: dpi,
      Address: address,
      Phone: phone,
      Job: job,
      MonthlyIncome: monthlyIncome,
      AccountNumber: accountNumber,
      RoleId: clientRole.Id,
      Status: false,
    });

    return res.status(201).json({
      success: true,
      message: 'Registro exitoso. Espera aprobación del administrador.',
      userId: user.Id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error en registro' });
  }
};


// ─── LOGIN ────────────────────────────────────────────────────────────────────
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { Email: email },
      include: { model: Role, as: 'role' },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Credenciales inválidas' });
    }

    if (!user.Status) {
      return res.status(403).json({ success: false, message: 'Cuenta pendiente de aprobación' });
    }

    const valid = await argon2.verify(user.Password, password);
    if (!valid) {
      return res.status(400).json({ success: false, message: 'Credenciales inválidas' });
    }

    const token = await generateJWT(user.Id, {
      role: user.role.Name,
      email: user.Email,
    });

    return res.json({
      success: true,
      token,
      user: {
        Id: user.Id,
        Name: user.Name,
        Username: user.Username,
        Email: user.Email,
        role: user.role.Name,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error en login' });
  }
};


// ─── PASO 1: Solicitar código de recuperación ─────────────────────────────────
// POST /auth/forgot-password/request
export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'El correo es obligatorio' });
    }

    // Buscar usuario por correo (no revelar si existe o no por seguridad)
    const user = await User.findOne({ where: { Email: email } });

    if (user) {
      const code = generateCode();
      console.log(`🔑 CÓDIGO GENERADO PARA ${email}: ${code}`);
      const expiresAt = Date.now() + CODE_EXPIRY_MS;

      // Guardar código (sobreescribe si ya había uno previo)
      resetCodes.set(email.toLowerCase(), { code, expiresAt });

      // Enviar correo (si falla el envío, igual respondemos éxito para no revelar el email)
      try {
        await sendPasswordResetCode(email, code);
      } catch (mailErr) {
        console.error('Error enviando correo de recuperación:', mailErr);
      }
    }

    // Siempre respondemos lo mismo para no revelar si el correo existe
    return res.json({
      success: true,
      message: 'Si el correo está registrado, recibirás un código de verificación.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error al procesar la solicitud' });
  }
};


// ─── PASO 2: Verificar código ────────────────────────────────────────────────
// POST /auth/forgot-password/verify
export const verifyResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ success: false, message: 'Correo y código son obligatorios' });
    }

    const entry = resetCodes.get(email.toLowerCase());

    if (!entry) {
      return res.status(400).json({ success: false, message: 'Código inválido o expirado' });
    }

    if (Date.now() > entry.expiresAt) {
      resetCodes.delete(email.toLowerCase());
      return res.status(400).json({ success: false, message: 'El código ha expirado. Solicita uno nuevo.' });
    }

    if (entry.code !== code.trim()) {
      return res.status(400).json({ success: false, message: 'Código incorrecto' });
    }

    // Marcar como verificado (permitir cambio de contraseña)
    entry.verified = true;

    return res.json({ success: true, message: 'Código verificado correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error al verificar el código' });
  }
};


// ─── PASO 3: Cambiar contraseña ───────────────────────────────────────────────
// PUT /auth/forgot-password/reset
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'La contraseña debe tener mínimo 8 caracteres' });
    }

    const entry = resetCodes.get(email.toLowerCase());

    if (!entry || !entry.verified) {
      return res.status(400).json({ success: false, message: 'Debes verificar tu código primero' });
    }

    if (Date.now() > entry.expiresAt) {
      resetCodes.delete(email.toLowerCase());
      return res.status(400).json({ success: false, message: 'La sesión de recuperación expiró. Solicita un nuevo código.' });
    }

    const user = await User.findOne({ where: { Email: email } });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    const hash = await argon2.hash(newPassword);
    user.Password = hash;
    await user.save();

    // Limpiar el código usado
    resetCodes.delete(email.toLowerCase());

    return res.json({ success: true, message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error al actualizar la contraseña' });
  }
};