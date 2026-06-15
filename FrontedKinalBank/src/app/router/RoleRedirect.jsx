// front/src/app/router/RoleRedirect.jsx
import { Navigate } from "react-router-dom";

/**
 * Después del login redirige automáticamente al dashboard
 * correspondiente al rol del usuario.
 * Úsalo en la ruta raíz "/" o como fallback de /dashboard.
 */
export const RoleRedirect = () => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/" replace />;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const role = payload?.role;

    if (role === "ADMIN") return <Navigate to="/dashboard/users" replace />;
    if (role === "CLIENT") return <Navigate to="/dashboard/client" replace />;

    return <Navigate to="/" replace />;
  } catch {
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }
};
