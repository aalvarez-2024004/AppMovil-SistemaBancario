import { axiosAuth } from "./api";

export const getPendingUsers = () =>
  axiosAuth.get("/users/pending");

export const getApprovedUsers = (search = "") =>
  axiosAuth.get(`/users/approved?search=${encodeURIComponent(search)}`);

export const approveUser = (userId, role = "CLIENT") =>
  axiosAuth.put("/users/approve", { userId, role });

export const denyUser = (userId) =>
  axiosAuth.delete(`/users/deny/${userId}`);

export const getMyProfile  = ()       => axiosAuth.get('/users/me');
export const updateMyProfile = (data) => axiosAuth.put('/users/me', data);