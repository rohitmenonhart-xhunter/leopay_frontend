/**
 * Application configuration
 */

interface Config {
  apiUrl: string;
  appName: string;
  isProduction: boolean;
}

// Determine if we're in production
const isProduction = import.meta.env.PROD;

// Determine API URL based on environment
const getApiUrl = (): string => {
  // For development
  if (!isProduction) {
    // Use environment variable if set, otherwise fallback
    return import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
  }
  
  // For production - use our own proxy
  // This will route through /api/proxy on the same domain, avoiding CORS issues
  return '/api/proxy';
};

const config: Config = {
  apiUrl: getApiUrl(),
  appName: 'LeoPay',
  isProduction
};

export default config; 