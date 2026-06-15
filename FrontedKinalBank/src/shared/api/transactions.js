import { coreApi } from "./api.js";
 
export const makeTransfer = (data) =>
    coreApi.post("/transactions/create", data);
 
export const getTransactionById = (id) =>
    coreApi.get(`/transactions/${id}`);
 
export const getMyTransactions = (page = 1) =>
    coreApi.get(`/transactions/my-transactions?page=${page}`);

export const getAccountsByActivity = (order = 'desc') =>
    coreApi.get(`/transactions/by-activity?order=${order}`);

export const getAccountTransactions = (accountId, limit = 5) =>
    coreApi.get(`/transactions/account/${accountId}?limit=${limit}`);