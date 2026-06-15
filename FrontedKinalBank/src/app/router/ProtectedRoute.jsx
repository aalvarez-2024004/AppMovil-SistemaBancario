import { Navigate } from "react-router-dom";

/**
 * Lee el JWT del localStorage, lo decodifica y protege rutas por rol.
 *
 * Props:
 *  - allowedRoles: string[]  ej. ['ADMIN'] o ['CLIENT']
 *  - redirectTo:   string    ruta a redirigir si no tiene permiso (default "/")
 */
export const ProtectedRoute = ({ children, allowedRoles = [], redirectTo = "/" }) => {
  const token = localStorage.getItem("token");

  console.log("TOKEN:", token ? "existe" : "no existe")  // 👈

  if (!token) return <Navigate to={redirectTo} replace />;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const role = payload?.role;

    console.log("PAYLOAD ROLE:", role, "ALLOWED:", allowedRoles)  // 👈

    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
      if (role === "ADMIN") return <Navigate to="/dashboard/users" replace />;
      if (role === "CLIENT") return <Navigate to="/dashboard/client" replace />;
      return <Navigate to={redirectTo} replace />;
    }

    return children;
  } catch {
    localStorage.removeItem("token");
    return <Navigate to={redirectTo} replace />;
  }
};