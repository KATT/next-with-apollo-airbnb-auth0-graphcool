const next = require('next');
// const { parse } = require('url');
const express = require('express');
const bodyParser = require('body-parser');
// const pathMatch = require('path-match');

const checkMissingEnvVars = require('./checkMissingEnvVars');

const { sessionConfig } = require('./session');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
// const route = pathMatch();

// check for missing env vars
checkMissingEnvVars();

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(sessionConfig);

  server.use((req, res, nxt) => {
    if (!req.session) {
      nxt(new Error('Oh no!'));
      return;
    }

    nxt();
  });

  server.get('/auth/session', (req, res) => {
    const { token, r } = req.query;

    if (token) {
      req.session.userToken = token; // eslint-disable-line no-param-reassign
    }

    return res.redirect(r || '/');
  });

  server.get('/logout', (req, res) => {
    req.session.destroy(() => {
      res.redirect('/');
    });
  });

  server.get('*', (req, res) => handle(req, res));

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
