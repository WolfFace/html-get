import http from 'http';
import https from 'https';
import url from 'url';
import { getCredentials } from './tls';
import {ThenableWebDriver} from "selenium-webdriver";
const { Builder, By } = require('selenium-webdriver');

let driver: ThenableWebDriver = new Builder()
  .forBrowser('chrome')
  .setChromeOptions()
  .build();

const domain = 'example.com';
const credentials = getCredentials(domain);

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

  driver.get(parseUrl)
    .then(() => {
      return new Promise(resolve => setTimeout(resolve, 2000));
    })
    .then(() => {
      return driver.findElement(By.css('html'));
    })
    .then(element => {
      return element.getAttribute('outerHTML');
    })
    .then(htmlStr => {
      res.end(htmlStr);
    });
}
