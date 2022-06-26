import http from 'http';
import https from 'https';
import url from 'url';
import { getCredentials } from './tls';
import puppeteer from 'puppeteer';

const domain = 'example.com';
const credentials = getCredentials(domain);
const userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4182.0 Safari/537.36";

http.createServer(serve).listen(80, '0.0.0.0', () => {
  console.log(`Server running at http://localhost`);
});
https.createServer(credentials, serve).listen(443, "0.0.0.0", () => {
  console.log(`Server running at https://localhost`);
});

async function serve(req: http.IncomingMessage, res: http.ServerResponse) {
  console.log("request ", req.headers.host, req.url);

  const q = url.parse(req.url || '', true).query;
  const parseUrl = '' + q.url || '';

  res.writeHead(200, { "Content-Type": "text/html" });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setUserAgent(userAgent);
  await page.goto(parseUrl, { waitUntil: 'networkidle0' });

  // @ts-ignore
  const data = await page.evaluate(() => document.querySelector('*').outerHTML);

  await browser.close();

  res.end(data);
}
