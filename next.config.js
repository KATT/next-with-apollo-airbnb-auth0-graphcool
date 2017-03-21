const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const checkMissingEnvVars = require('./server/checkMissingEnvVars');

checkMissingEnvVars();

const FRONTEND_ENV_KEYS = [
  'NODE_ENV',
  'AUTH0_CLIENT_ID',
  'AUTH0_DOMAIN',
  'GRAPHCOOL_PROJECT_ID',
];

const envPlugin = FRONTEND_ENV_KEYS.reduce((result, key) => (
  Object.assign({}, result, { [`process.env.${key}`]: JSON.stringify(process.env[key]) })
), {});


module.exports = {
  webpack(cfg) {
    cfg.plugins.push(new webpack.DefinePlugin(envPlugin));

    return cfg;
  },
};
