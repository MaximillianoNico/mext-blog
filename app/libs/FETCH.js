import axios from 'axios';
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const FETCH = axios.create({
  baseURL: publicRuntimeConfig.API_URL,
  timeout: 10000,
});

export default FETCH;
