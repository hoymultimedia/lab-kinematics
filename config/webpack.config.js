/**
 * Webpack merge
 * Combines different config files and concatenates arrays and merges objects creating a new object.
 * If keys match last passed object will take precedence.
 * (webpack.dev.js, webpack.production.js )
 */
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = () => {
  const env = process.env.NODE_ENV;
  if (env === 'development') {
    const devConfig = require('./webpack.dev.js');
    return merge(commonConfig, devConfig);
  }
  if (env === 'production') {
    const prodConfig = require('./webpack.prod.js');
    return merge(commonConfig, prodConfig);
  }
  return null;
};
