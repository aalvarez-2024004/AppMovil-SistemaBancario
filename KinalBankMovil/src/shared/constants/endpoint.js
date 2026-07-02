import { Platform } from "react-native";

const USE_LOCAL_LAN = false;

const BASE_URL =
  Platform.OS === "web"
    ? "https://kinalbank-auth-api.onrender.com/api/v1"
    : USE_LOCAL_LAN
    ? "http://192.168.0.4:3005/api/v1"
    : "https://kinalbank-auth-api.onrender.com/api/v1";

const BANK_BASE_URL =
  Platform.OS === "web"
    ? "https://appmovil-sistemabancario.onrender.com/kinalBank/v1"
    : USE_LOCAL_LAN
    ? "http://192.168.0.6:3006/kinalBank/v1"
    : "https://appmovil-sistemabancario.onrender.com/kinalBank/v1";

export const AUTH_ENDPOINTS = {
  LOGIN:          `${BASE_URL}/auth/login`,
  REGISTER:       `${BASE_URL}/auth/register`,
  LOGOUT:         `${BASE_URL}/auth/logout`,
  REFRESH:        `${BASE_URL}/auth/refresh`,
  PROFILE:        `${BASE_URL}/users/me`,
  UPDATE_PROFILE: `${BASE_URL}/users/me`,
  REQUEST_RESET:  `${BASE_URL}/auth/forgot-password/request`,
  VERIFY_CODE:    `${BASE_URL}/auth/forgot-password/verify`,
  RESET_PASSWORD: `${BASE_URL}/auth/forgot-password/reset`,
};

export const CLIENT_ENDPOINTS = {
  MY_ACCOUNTS:     `${BANK_BASE_URL}/client/accounts`,
  MY_TRANSACTIONS: `${BANK_BASE_URL}/client/transactions`,
};

export const TRANSACTION_ENDPOINTS = {
  CREATE: `${BANK_BASE_URL}/transactions/create`,
};

export const FAVORITE_ENDPOINTS = {
  LIST:   `${BANK_BASE_URL}/favorites/listar`,
  CREATE: `${BANK_BASE_URL}/favorites/create`,
  UPDATE: (id) => `${BANK_BASE_URL}/favorites/update/${id}`,
  DELETE: (id) => `${BANK_BASE_URL}/favorites/delete/${id}`,
};

export const PRODUCT_ENDPOINTS = {
    LIST:         `${BANK_BASE_URL}/products/listar`,
    MY_POINTS:    `${BANK_BASE_URL}/points/me`,
    BUY:          (id) => `${BANK_BASE_URL}/products/buy/${id}`,
    REDEEM:       (id) => `${BANK_BASE_URL}/products/redeem/${id}`,
    BUY_DISCOUNT: (id) => `${BANK_BASE_URL}/products/buy-discount/${id}`,
};
export default BASE_URL;