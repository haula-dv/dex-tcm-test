import { readFileSync } from 'fs';
import { createServer as createHttpsServer } from 'https';
import next from 'next';
import { parse } from 'url';

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0'; // Listen on all interfaces
const port = process.env.PORT || 3000;

// Path to your SSL certificates
// Make sure these files exist! Run: mkcert localhost 192.168.1.10 127.0.0.1
const httpsOptions = {
  key: readFileSync('./localhost+2-key.pem'),
  cert: readFileSync('./localhost+2.pem'),
};

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createHttpsServer(httpsOptions, async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, () => {
    console.log(`> Ready on https://localhost:${port}`);
    console.log(`> Also available on https://192.168.1.10:${port}`);
  });
});
