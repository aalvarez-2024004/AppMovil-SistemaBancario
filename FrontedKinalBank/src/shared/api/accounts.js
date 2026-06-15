import { coreApi } from "./api";

export const getAccounts = (page = 1, limit = 15) =>
  coreApi.get(`/accounts/listar?page=${page}&limit=${limit}`);

export const createAccount = (data) =>
  coreApi.post("/accounts/create", data);

export const updateAccount = (id, data) =>
  coreApi.put(`/accounts/${id}`, data);

export const deleteAccount = (id) =>
  coreApi.delete(`/accounts/${id}`);