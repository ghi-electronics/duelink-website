const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy endpoint for the forum API
app.use('/api/forum', createProxyMiddleware({
  target: 'https://forums.ghielectronics.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/forum': '', // Remove /api/forum prefix when forwarding
  },
  onProxyRes: function (proxyRes, req, res) {
    // Add CORS headers to the response
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type';
  }
}));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
  console.log(`Forum API available at http://localhost:${PORT}/api/forum/c/duelink/duelink-announcement/35/l/latest.json`);
});