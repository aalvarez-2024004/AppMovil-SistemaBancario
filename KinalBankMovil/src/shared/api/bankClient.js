import axios from "axios";
import { CLIENT_ENDPOINTS, TRANSACTION_ENDPOINTS, FAVORITE_ENDPOINTS } from "../constants/endpoint";

const bankClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export const getMyAccountsRequest = (token) =>
  bankClient.get(CLIENT_ENDPOINTS.MY_ACCOUNTS, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getMyTransactionsRequest = (token, page = 1, limit = 10) =>
  bankClient.get(CLIENT_ENDPOINTS.MY_TRANSACTIONS, {
    headers: { Authorization: `Bearer ${token}` },
    params: { page, limit },
  });

// ── Transacciones (crear) ──────────────────────────────────────────
// payload: { type: 'TRANSFERENCIA', amount, fromAccount, toAccount, description }
export const createTransactionRequest = (token, payload) =>
  bankClient.post(TRANSACTION_ENDPOINTS.CREATE, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });

// ── Favoritos ───────────────────────────────────────────────────────
export const getMyFavoritesRequest = (token) =>
  bankClient.get(FAVORITE_ENDPOINTS.LIST, {
    headers: { Authorization: `Bearer ${token}` },
  });

// payload: { alias, accountNumber }
export const addFavoriteRequest = (token, payload) =>
  bankClient.post(FAVORITE_ENDPOINTS.CREATE, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });

// payload: { alias?, accountNumber? }
export const updateFavoriteRequest = (token, id, payload) =>
  bankClient.put(FAVORITE_ENDPOINTS.UPDATE(id), payload, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteFavoriteRequest = (token, id) =>
  bankClient.delete(FAVORITE_ENDPOINTS.DELETE(id), {
    headers: { Authorization: `Bearer ${token}` },
  });