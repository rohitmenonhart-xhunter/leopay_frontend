// Vercel Serverless Function to act as a CORS proxy
const axios = require('axios');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  // Handle OPTIONS request (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Get the path from the request URL
    const path = req.url.replace('/api/proxy', '');
    
    // Build the target URL
    const targetUrl = `https://leopay-backend.onrender.com/api${path}`;
    
    // Forward the request headers
    const headers = { ...req.headers };
    
    // Remove host header to avoid conflicts
    delete headers.host;
    
    // Make the request to the target API
    const response = await axios({
      method: req.method,
      url: targetUrl,
      headers,
      data: req.body,
      validateStatus: () => true // Don't throw on error status codes
    });
    
    // Forward the response
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy server error' });
  }
}; 