const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');

/* Use next-compose-plugins to simplify the usage of multiple plugins */
module.exports = withPlugins(
  [withPWA, {
      pwa: {
        dest: 'public',
        swSrc: 'service-worker.js'
      }
    },
  ],
)