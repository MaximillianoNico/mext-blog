/* eslint-disable no-undef */
const withOffline = require("next-offline");
const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
const path = require('path');
const { parsed: localEnv } = require('dotenv').config()
console.log('localEnv', localEnv)

module.exports = withCss(withSass(withOffline({
  generateSw: false,
  dontAutoRegisterSw: true,
  workboxOpts: {
    swDest: "./service-worker.js",
    swSrc: path.join(__dirname, "./app/service-worker.js"),
    // generateInDevMode: true,
    // globPatterns: ['static/**/*'],
    // globDirectory: '.',
  },

  webpack: config => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins
    ];

    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }

    return config
  },

  // Will be available on both server and client
  publicRuntimeConfig: localEnv
})));
