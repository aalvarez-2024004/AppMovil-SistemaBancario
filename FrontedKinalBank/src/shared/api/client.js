import { coreApi } from "./api";

// ── Cuentas del cliente autenticado ──────────────────────────────────────────
// GET /kinalBank/v1/client/accounts
export const getMyAccounts = () =>
    coreApi.get("/client/accounts");
