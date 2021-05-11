module.exports = {
  globDirectory: "dist/",
  globPatterns: ["**/*.{html,webmanifest,js,css,jpg}"],
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  swDest: "dist/sw.js",
};
