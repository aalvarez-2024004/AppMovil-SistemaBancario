import { coreApi } from "./api.js";

export const getMyFavorites = () =>
    coreApi.get("/favorites/listar");

export const addFavorite = (data) =>
    coreApi.post("/favorites/create", data);

export const updateFavorite = (id, data) =>
    coreApi.put(`/favorites/update/${id}`, data);

export const deleteFavorite = (id) =>
    coreApi.delete(`/favorites/delete/${id}`);