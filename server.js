const http = require('http');
const { parse } = require('url');
const next = require('next');

const https = require('https');
const fs = require('fs');

// const og = require('open-graph');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = 3000;

const httpsOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
};

app.prepare().then(() => {
  http
    .createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    })
    .listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });

  https
    .createServer(httpsOptions, (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);

      // if (parsedUrl.pathname === '/api/fetch-og-data') {
      //   const url = parsedUrl.query.url;
      //   og(url, (err, meta) => {
      //     if (err) {
      //       res.statusCode = 500;
      //       res.end(JSON.stringify({ error: err }));
      //       console.log(err);
      //       return;
      //     }
      //     res.statusCode = 200;
      //     res.end(JSON.stringify(meta));
      //     console.log(meta);
      //   });
      // } else {
      //   handle(req, res, parsedUrl);
      // }
    })
    .listen(PORT + 1, (err) => {
      if (err) throw err;
      console.log(`> HTTPS: Ready on https://localhost:${PORT + 1}`);
    });
});
