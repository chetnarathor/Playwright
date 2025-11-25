// @ts-check
const { devices } = require('@playwright/test');
const JSONReporter = require('./JSONReporter');

const config = {
  testDir: './tests',
  retries :0,
  
  /* Maximum time one test can run for. */
  timeout: 90 * 1000,
  expect: {
  
    timeout: 10000
  },
  
  reporter: 'html',
  reporters: [
    ['list'],
    [JSONReporter]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  projects: [
    {
      name: 'Headed Mode',
      use: {
        actionTimeout: 10_000,
        navigationTimeout: 60_000,
        browserName: 'chromium',
        headless: false, // Headed mode
        screenshot: 'on',
        trace: 'on',
        baseURL: 'https://demowebshop.tricentis.com',
      },
    },
    {
      name: 'Headless Mode',
      use: {
        actionTimeout: 10_000,
        navigationTimeout: 60_000,
        browserName: 'chromium',
        headless: true, // Headless mode
        screenshot: 'on',
        trace: 'on',
        baseURL: 'https://demowebshop.tricentis.com',
      },
    },
  ],
};

module.exports = config;
