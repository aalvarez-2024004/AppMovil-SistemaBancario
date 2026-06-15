'use strict';

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'realiqueznoriega80@gmail.com',
        pass: 'crdjpusurqpzuzel',
    },
});

/**
 * Envía el código de recuperación de contraseña al correo del usuario.
 * @param {string} toEmail  - Correo destino
 * @param {string} code     - Código de 6 dígitos
 */
export const sendPasswordResetCode = async (toEmail, code) => {
    const mailOptions = {
        from: '"KinalBank" <realiqueznoriega80@gmail.com>',
        to: toEmail,
        subject: 'Código de recuperación de contraseña - KinalBank',
        html: `
        <div style="font-family:'Helvetica Neue',sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#ffffff;border-radius:8px;border:1px solid #e5e7eb;">
            <div style="text-align:center;margin-bottom:24px;">
            <h2 style="margin:0;font-size:20px;font-weight:700;color:#111827;letter-spacing:-0.01em;">KinalBank</h2>
            <p style="margin:4px 0 0;font-size:12px;color:#6b7280;letter-spacing:0.05em;text-transform:uppercase;">Recuperación de contraseña</p>
            </div>

            <p style="font-size:14px;color:#374151;line-height:1.6;margin-bottom:24px;">
            Recibimos una solicitud para restablecer la contraseña de tu cuenta. Usa el siguiente código de autorización:
            </p>

            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:24px;text-align:center;margin-bottom:24px;">
            <span style="font-size:36px;font-weight:700;letter-spacing:0.18em;color:#111827;">${code}</span>
            </div>

            <p style="font-size:13px;color:#6b7280;line-height:1.55;margin-bottom:0;">
            Este código expira en <strong>15 minutos</strong>. Si no solicitaste este cambio, ignora este correo y tu contraseña permanecerá sin cambios.
            </p>

            <hr style="border:none;border-top:1px solid #f3f4f6;margin:24px 0;" />
            <p style="font-size:11px;color:#9ca3af;text-align:center;margin:0;">
            © ${new Date().getFullYear()} KinalBank · Guatemala
            </p>
        </div>
        `,
    };

    await transporter.sendMail(mailOptions);
};