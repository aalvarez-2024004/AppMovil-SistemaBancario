import axios from "axios";
import { CLIENT_ENDPOINTS } from "../constants/endpoint";

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