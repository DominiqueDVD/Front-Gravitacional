module.exports = function override(config, env) {
  config.resolve.alias = {
    ...config.resolve.alias,
    path: require.resolve('path-browserify'),
    fs: false
  };
  return config;
};