module.exports = {
  webpack: (config, options) => {
    config.resolve.extensions.push(".ts")
    config.resolve.extensions.push(".tsx")
    config.module.rules.push({
      test: /\.tsx?$/,
      loader: "awesome-typescript-loader",
      options: {},
    })

    return config
  },
}
