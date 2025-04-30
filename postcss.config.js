// postcss.config.js
module.exports = {
  plugins: [
    require("postcss-flexbugs-fixes"),
    require("tailwindcss"),
    require("autoprefixer"),
    require("postcss-preset-env")({
      stage: 3,
      features: {
        'nesting-rules': false,
      },
    }),
  ],
};
