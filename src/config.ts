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
  // Always prioritize environment variable if it exists
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Fallbacks if environment variable is not set
  if (!isProduction) {
    return 'http://localhost:5001/api';
  }
  
  // For production - use the deployed Render backend
  return 'https://leopay-backend.onrender.com/api';
};

const config: Config = {
  apiUrl: getApiUrl(),
  appName: 'EarnMockello',
  isProduction
};

export default config; 