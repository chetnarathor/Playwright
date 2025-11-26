// @ts-check
const { devices } = require('@playwright/test');
const JSONReporter = require('./JSONReporter');

/**
 * Playwright configuration file.
 * Defines test settings, reporters, and projects.
 */
const config = {
  testDir: './tests', // Directory containing test files.
  retries: 0, // Number of retries for failed tests.

  timeout: 90 * 1000, // Maximum time one test can run for.
  expect: {
    timeout: 10000 // Timeout for expect assertions.
  },

  reporter: 'html', // Default reporter.
  reporters: [
    ['list'], // Console reporter.
    [require('./JSONReporter')] // Custom JSON reporter.
  ],

  workers: 1, // Number of parallel workers.
  projects: [
    {
      name: 'Headed Mode',
      use: {
        browserName: 'chromium',
        headless: false, // Run tests in headed mode.
        screenshot: 'on',
        trace: 'on',
        baseURL: 'https://demowebshop.tricentis.com',
      },
    },
    {
      name: 'Headless Mode',
      use: {
        browserName: 'chromium',
        headless: true, // Run tests in headless mode.
        screenshot: 'on',
        trace: 'on',
        baseURL: 'https://demowebshop.tricentis.com',
      },
    },
  ],
};

module.exports = config;
