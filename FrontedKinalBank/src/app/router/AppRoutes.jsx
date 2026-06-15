import { Routes, Route, Navigate } from "react-router-dom";
import { AuthPage } from "../../features/auth/pages/AuthPage.jsx";
import { AdminGeneralLayout } from "../../features/admin-general/layout/AdminGeneralLayout.jsx";
import { AccountsPage } from "../../features/admin-general/pages/AccountsPage.jsx";
import { UsersPage } from "../../features/admin-general/pages/UserPage.jsx";
import { ClientLayout } from "../../features/client/layout/ClientLayout.jsx";
import { ClientHomePage } from "../../features/client/pages/ClientHomePage.jsx";
import { ClientAccountsPage } from "../../features/client/pages/ClientAccountsPage.jsx";
import { ClientTransactionsPage } from "../../features/client/pages/ClientTransactionsPage.jsx";
import { ClientTransferPage } from "../../features/client/pages/ClientTransferPage.jsx";
import { ClientFavoritesPage } from "../../features/client/pages/ClientFavoritesPage.jsx";
import { ClientProductsPage } from "../../features/client/pages/ClientProductsPage.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import { RoleRedirect } from "./RoleRedirect.jsx";
import { DepositPage } from "../../features/admin-general/pages/DepositPage.jsx";
import { ProductsPage } from "../../features/admin-general/pages/ProductsPage.jsx";
import { AdminTransactionsPage } from "../../features/admin-general/pages/AdminTransactionsPage.jsx";

export const AppRoutes = () => {
    return (
        <Routes>
            {/* Login */}
            <Route path="/" element={<AuthPage />} />

            {/* ── ADMIN ── */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute allowedRoles={["ADMIN"]}>
                        <AdminGeneralLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<RoleRedirect />} />
                <Route path="users"    element={<UsersPage />} />
                <Route path="accounts" element={<AccountsPage />} />
                <Route path="deposits" element={<DepositPage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="transactions" element={<AdminTransactionsPage />} />
            </Route>

            {/* ── CLIENT ── */}
            <Route
                path="/dashboard/client"
                element={
                    <ProtectedRoute allowedRoles={["CLIENT"]}>
                        <ClientLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<ClientHomePage />} />
                <Route path="accounts"     element={<ClientAccountsPage />} />
                <Route path="transactions" element={<ClientTransactionsPage />} />
                <Route path="transfer"     element={<ClientTransferPage />} />
                <Route path="favorites"    element={<ClientFavoritesPage />} />
                <Route path="products"     element={<ClientProductsPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};