// proxy-server.js
const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = 3001;

// Enable CORS for your React app
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Proxy all requests to Netlify functions
app.use('/.netlify/functions', createProxyMiddleware({
  target: 'https://comfy-bonbon-7c852c.netlify.app',
  changeOrigin: true,
  onProxyRes: function(proxyRes) {
    // Add CORS headers to response
    proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000';
    proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
  }
}));

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});