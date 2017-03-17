/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs');
const path = require('path');

const components = fs.readdirSync(path.join(__dirname, '../../../components'));
const containers = fs.readdirSync(path.join(__dirname, '../../../containers'));
const pages = fs.readdirSync(path.join(__dirname, '../../../pages'));

const all = [...components, ...containers, ...pages];

function componentExists(comp) {
  const regEx = new RegExp(`^${comp}(\.[^\.]+)$`, 'i'); // eslint-disable-line no-useless-escape

  return all.find(fileName => regEx.test(fileName));
}

module.exports = componentExists;
