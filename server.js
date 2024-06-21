const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3001;

// Middleware to enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, apiurl'); // Add 'apiurl' header
  next();
});

// Route to proxy server
app.get('/proxyserver', async (req, res) => {
  try {
    const apiUrl = req.headers.apiurl; 
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: req.headers.authorization
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
