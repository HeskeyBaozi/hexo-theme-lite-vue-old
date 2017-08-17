const express = require('express');
const nodePath = require('path');
const isProd = process.env.NODE_ENV === 'production';
const {createBundleRenderer} = require('vue-server-renderer');
const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const fs = require('fs');


const app = new express();

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: fs.readFileSync(nodePath.resolve(__dirname, './dist/index.html'), 'utf-8'),
  clientManifest: require('./dist/vue-ssr-client-manifest.json'),
});

function serve(path, cache) {
  return express.static(nodePath.resolve(__dirname, path), {
    maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
  });
}

app.use('/assets', serve('./dist/assets', true));

function render(req, res) {
  const s = Date.now();

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Server', 'Hello');

  function handleError(error) {
    if (error.url) {
      res.redirect(error.url);
    } else if (error.code === 404) {
      res.status(404).end('404 :(');
    } else {
      res.status(500).end('500 :(');
    }
  }

  const ctx = {url: req.url};

  renderer.renderToString(ctx, (err, html) => {
    if (err) {
      console.log(err);
      return handleError(err)
    }

    res.end(html);

    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`)
    }
  });
}

app.get('*', render);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
});
