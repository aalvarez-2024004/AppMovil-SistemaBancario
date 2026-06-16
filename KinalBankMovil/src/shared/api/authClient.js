import axios from "axios";
import { Platform } from "react-native";
import { AUTH_ENDPOINTS } from "../constants/endpoint";

const authClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginRequest    = (data)  => authClient.post(AUTH_ENDPOINTS.LOGIN, data);
export const registerRequest = (data)  => authClient.post(AUTH_ENDPOINTS.REGISTER, data);

export const requestPasswordResetRequest = (data) => authClient.post(AUTH_ENDPOINTS.REQUEST_RESET, data);
export const verifyResetCodeRequest      = (data) => authClient.post(AUTH_ENDPOINTS.VERIFY_CODE, data);
export const resetPasswordRequest        = (data) => authClient.post(AUTH_ENDPOINTS.RESET_PASSWORD, data);

export const profileRequest = (token) =>
  authClient.get(AUTH_ENDPOINTS.PROFILE, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateProfileRequest = (data, token) =>
  authClient.put(AUTH_ENDPOINTS.UPDATE_PROFILE, data, {
    headers: { Authorization: `Bearer ${token}` },
  });