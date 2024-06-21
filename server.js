const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3001;

// CORS Middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, apiurl');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.get('/proxyserver', async (req, res) => {
  try {
    const apiUrl = req.headers.apiurl;
    if (!apiUrl) {
      return res.status(400).json({ error: 'apiurl header is required' });
    }
    
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: req.headers.authorization
      }
    });
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch data' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
