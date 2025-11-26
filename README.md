# Playwright Assessment Final

This project contains end-to-end tests for a web application using Playwright.

## Project Structure

- `config.js`: Configuration file for the project.
- `package.json`: Contains project dependencies and scripts.
- `playwright.config.js`: Playwright configuration file.
- `pageobjects/`: Contains Page Object Model (POM) classes for different pages.
  - `CartPage.js`
  - `CheckoutPage.js`
  - `LoginPage.js`
- `playwright-report/`: Contains the Playwright test reports.
- `test-results/`: Stores test results and artifacts.
- `tests/`: Contains test specifications.
  - `End2EndFlow.spec.js`: Main end-to-end test file.

## Prerequisites

Ensure you have the following installed:

1. **Node.js** (v16 or higher recommended)
2. **npm** (comes with Node.js)

To verify installation, run:
```powershell
node -v; npm -v
```

## Setup Instructions

1. Clone the repository:
```powershell
git clone <repository-url>
```

2. Navigate to the project directory:
```powershell
cd Playwright_Assessment_Final
```

3. Install dependencies:
```powershell
npm install
```

## Running Tests

To execute the tests, use the following command:
```powershell
npx playwright test
```

## Running Tests in Headed and Headless Modes

This project is configured to run tests in both headed and headless modes. Each mode is defined as a separate project in the Playwright configuration.

### Running All Tests
To run tests in both headed and headless modes, use:
```powershell
npx playwright test
```

### Running Tests in Headed Mode
To run tests in headed mode, use:
```powershell
npx playwright test --project="Headed Mode"
```

### Running Tests in Headless Mode
To run tests in headless mode, use:
```powershell
npx playwright test --project="Headless Mode"
```

### Running Specific Tests
To run a specific test file, use:
```powershell
npx playwright test tests/End2EndFlow.spec.js
```

### Viewing Test Reports
After running the tests, a report will be generated in the `playwright-report/` directory. Open the `index.html` file to view the report:
```powershell
start playwright-report/index.html
```

## Page Objects

### CartPage
The `CartPage` class contains methods to interact with the shopping cart page.

#### Methods:
- `addProductToCart(productAltText)`: Adds a product to the cart using its alt text.
- `navigateToCart()`: Navigates to the shopping cart page.
- `acceptTermsAndCheckout()`: Accepts the terms of service and proceeds to checkout.
- `addProductByName(name)`: Adds a product to the cart by its name.
- `verifyProductDetails(productName, expectedQuantity)`: Verifies the product details in the cart.

### CheckoutPage
The `CheckoutPage` class contains methods to complete the checkout process.

#### Methods:
- `completeCheckout()`: Completes the checkout process by navigating through all steps.
- `verifyOrderSuccess()`: Verifies that the order was successfully placed.

### LoginPage
The `LoginPage` class contains methods to handle login functionality.

#### Methods:
- `navigateToLogin()`: Navigates to the login page.
- `login(email, password)`: Logs in using the provided email and password.

## JSON Reporter

A custom JSON reporter logs test results in JSON format. The results are saved in `test-results.json`.

### How to Use the JSON Reporter

The JSON reporter is already integrated into the Playwright configuration. When you run the tests, the results will automatically be logged in the `test-results.json` file.

To view the JSON results, open the file:
```powershell
type test-results.json
```

## Additional Notes

- Ensure the application under test is running if required by the tests.
- Update the `playwright.config.js` file to configure test settings such as browser, base URL, and timeouts.

For more information on Playwright, visit the [official documentation](https://playwright.dev/docs/).