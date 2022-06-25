# Typescript Server Template

In development, watch and auto-compile TS src with

`yarn watch`

and re-run compiled JS server with (in another terminal)

`yarn dev`

In production, build with

`yarn build`

Run the server without watching changes with

`yarn start`

The template comes with a hello-world HTTP + HTTPS server plus some logic for TLS certificates to start you off. It tries to find a Let's Encrypt certificate in `/etc/letsencrypt/live/example.com` (change the domain!) and falls back to an auto-generated self-signed certificate. You can test that it works with

```sh
curl -k https://localhost
```

In production, get a real certificate and remove the HTTP server. Also, you might want to configure node.js to sit behind NGINX, in which case the TLS stuff moves to NGINX and is not needed here (but I think it's still great for a quicker start).

## Using the template

You can base a new Github repo on this template with the Github cli:

```sh
gh repo create my-repo --private --template mitschabaude/typescript-server-template
cd my-repo
git pull origin master
yarn
```

On the other hand, more often you want to start developing without publishing to Github. To do so, simply clone the repo and remove the .git folder.

```sh
git clone git@github.com:mitschabaude/typescript-server-template.git my-repo
cd my-repo
rm -rf .git
yarn
```
