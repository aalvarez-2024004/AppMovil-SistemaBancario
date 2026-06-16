import { Platform } from "react-native";

const BASE_URL = Platform.OS === "web"
  ? "http://localhost:3005/api/v1"
  : "http://192.168.0.10:3005/api/v1";

export const AUTH_ENDPOINTS = {
  LOGIN:          `${BASE_URL}/auth/login`,
  REGISTER:       `${BASE_URL}/auth/register`,
  LOGOUT:         `${BASE_URL}/auth/logout`,
  REFRESH:        `${BASE_URL}/auth/refresh`,
  PROFILE:        `${BASE_URL}/auth/profile`,
  UPDATE_PROFILE: `${BASE_URL}/users/me`,
  REQUEST_RESET:  `${BASE_URL}/auth/password-reset/request`,
  VERIFY_CODE:    `${BASE_URL}/auth/password-reset/verify`,
  RESET_PASSWORD: `${BASE_URL}/auth/password-reset/confirm`,
};

export default BASE_URL;