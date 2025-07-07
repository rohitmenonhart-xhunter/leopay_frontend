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
  // For local development
  if (!isProduction) {
    return 'http://localhost:5001/api';
  }
  
  // For production - always use the deployed Render backend
  return 'https://leopay-backend.onrender.com/api';
};

const config: Config = {
  apiUrl: getApiUrl(),
  appName: 'EarnMockello',
  isProduction
};

export default config; 