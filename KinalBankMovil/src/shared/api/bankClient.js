import axios from 'axios';
import { Platform } from 'react-native';

const BANK_BASE_URL = Platform.OS === 'web'
  ? 'http://localhost:3006/kinalBank/v1'
  : 'http://192.168.102.104:3006/kinalBank/v1';

const bankClient = axios.create({
  baseURL: BANK_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const BANK_ENDPOINTS = {
  MY_ACCOUNTS:       `${BANK_BASE_URL}/client/accounts`,
  MY_TRANSACTIONS:   `${BANK_BASE_URL}/transactions/my-transactions`,
  CLIENT_TRANSACTIONS: `${BANK_BASE_URL}/client/transactions`,
  MY_FAVORITES:      `${BANK_BASE_URL}/favorites/listar`,
  PRODUCTS:          `${BANK_BASE_URL}/products/listar`,
};

export const getMyAccounts = (token) =>
  bankClient.get(BANK_ENDPOINTS.MY_ACCOUNTS, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getMyTransactions = (token, page = 1, limit = 10) =>
  bankClient.get(BANK_ENDPOINTS.MY_TRANSACTIONS, {
    headers: { Authorization: `Bearer ${token}` },
    params: { page, limit },
  });

export const getMyFavorites = (token) =>
  bankClient.get(BANK_ENDPOINTS.MY_FAVORITES, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getProducts = () =>
  bankClient.get(BANK_ENDPOINTS.PRODUCTS);

export default bankClient;