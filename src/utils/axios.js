// utils/axios.js
import axios from "axios";

export const axiosBackInstance = axios.create({
  baseURL: process.env.API_URL, // Replace with your backend URL
  withCredentials: true, // Ensure cookies are sent with requests
});

export const axiosFrontInstance = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your backend URL
  withCredentials: true, // Ensure cookies are sent with requests
});