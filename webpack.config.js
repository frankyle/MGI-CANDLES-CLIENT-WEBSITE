module.exports = {
    // ... other Webpack config
    resolve: {
      fallback: {
        "fs": false, // or require.resolve("fs-extra") for a polyfill
        "path": require.resolve("path-browserify"),
        "os": require.resolve("os-browserify/browser"),
      },
    },
  };