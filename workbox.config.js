module.exports = {
  InjectManifest: (options) => {
    options.maximumFileSizeToCacheInBytes = 10 * 1024 * 1024;
    return options;
  },
};
