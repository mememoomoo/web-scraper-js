const express = require('express');
const path = require('path');
const scraper = require('./scraper');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.post('/api/scrape', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.json({ error: 'No URL provided.' });
  try {
    const results = await scraper(url);
    res.json({ results });
  } catch (err) {
    res.json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Add this line

app.listen(PORT, HOST, () => console.log(`Server running on http://${HOST}:${PORT}`));