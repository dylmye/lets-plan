const webpack = require("webpack");
const CracoWorkboxPlugin = require("craco-workbox");

const config = {
  webpack: {
    plugins: {
      add: [
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
        }),
      ],
    },
  },
  plugins: [
    {
      plugin: CracoWorkboxPlugin,
    },
  ],
};

export default config;
