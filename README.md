# Web Scraper JS

A Node.js server-side web scraper with an Express backend and a web-based frontend.

## Features

- Scrape web pages using Node.js
- Express server to handle API requests
- CORS enabled for cross-origin requests
- Simple web interface (`public/index.html`)
- Environment variable support with `.env`

## Project Structure

```
web-scraper-js/
├── node_modules/
├── public/
│   └── index.html
├── src/
│   ├── scraper.js
│   ├── routes.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Getting Started

1. **Install dependencies**
   ```
   npm install
   ```

2. **Set up environment variables**  
   Create a `.env` file and add any required variables.

3. **Run the server**
   ```
   node src/server.js
   ```

4. **Open the web interface**  
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm start` – Start the server

## Dependencies

- [express](https://www.npmjs.com/package/express)
- [axios](https://www.npmjs.com/package/axios) or [node-fetch](https://www.npmjs.com/package/node-fetch)
- [cheerio](https://www.npmjs.com/package/cheerio)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv) (optional)

##