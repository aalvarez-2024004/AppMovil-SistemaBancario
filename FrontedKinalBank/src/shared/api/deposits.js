import { coreApi } from "./api";

export const getDeposits = () =>
    coreApi.get("/deposits");

export const createDeposit = (data) =>
    coreApi.post("/deposits/create", data);

export const revertDeposit = (id) =>
    coreApi.put(`/deposits/revert/${id}`);

export const deleteDeposit = (id) =>
    coreApi.delete(`/deposits/${id}`);

export const getDepositById = (id) =>
    coreApi.get(`/deposits/${id}`);

export const updateDeposit = (id, data) =>
    coreApi.put(`/deposits/update/${id}`, data);

export const getMyDeposits = (accountId) =>
    coreApi.get(`/deposits/my/${accountId}`);