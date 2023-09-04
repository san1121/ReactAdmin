// frappeUtils.js

import { FrappeApp } from 'frappe-js-sdk';

const initializeFrappeApp = () => {
  // Read the environment variables from the .env file
  const SITE_URL = process.env.SITE_URL;
  const API_SECRET = process.env.API_SECRET;
  const API_KEY = process.env.API_KEY;

  // Initialize FrappeApp with authentication
  const frappe = new FrappeApp(SITE_URL, {
    useToken: true,
    token: () => `${API_KEY}:${API_SECRET}`,
    type: 'token',
  });

  return frappe;
};

export default initializeFrappeApp;
