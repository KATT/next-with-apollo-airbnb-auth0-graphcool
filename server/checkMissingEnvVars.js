const fs = require('fs');
const path = require('path');

const allEnvs = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '.env-cmdrc')));

module.exports = () => {
  const allKeys = new Set();

  Object.keys(allEnvs).forEach((env) => {
    Object.keys(allEnvs[env]).forEach((key) => {
      allKeys.add(key);
    });
  });

  const missingKeys = new Set();

  allKeys.forEach((key) => {
    if (typeof process.env[key] !== 'string') {
      missingKeys.add(key);
    }
  });

  if (missingKeys.size > 0) {
    const sorted = Array.from(missingKeys).sort();

    throw new Error(`Missing the following environment variables: ${sorted.join(', ')}`);
  }
};
