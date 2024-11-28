import { defineConfig } from 'cypress';
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

export default defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  chromeWebSecurity: false,
  requestTimeout: 30000,
  defaultCommandTimeout: 15000,
  responseTimeout: 30000,
  projectId: '8bcu3s',
  video: true,
  // retries: 1,
  videoUploadOnPasses: true,

  e2e: {
    experimentalSourceRewriting: false,
    watchForFileChanges: false,
    "reporter": "mochawesome",
    "reporterOptions": {
      "charts": true,
      "overwrite": false,
      "html": true,
      "json": true,
      "video": false,
      "embeddedScreenshots": true,
      "reportDir": "cypress/report"
    },
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
    excludeSpecPattern: '*.js',
    specPattern: 'cypress/e2e/**',
  },
});
