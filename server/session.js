const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const store = new RedisStore({
  url: '//redis-12495.c13.us-east-1-3.ec2.cloud.redislabs.com:12495',
  logErrors: true,
});

module.exports = {
  sessionConfig: session({
    secret: 'shhhhh',
    store,
    resave: false,
    saveUninitialized: false,
  }),
};
