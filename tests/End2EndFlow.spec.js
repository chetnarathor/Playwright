const { test, expect } = require('@playwright/test');
const LoginPage = require('../pageobjects/LoginPage');
const CartPage = require('../pageobjects/CartPage');
const CheckoutPage = require('../pageobjects/CheckoutPage');
const config = require('../config');

test('login and checkout test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Login
    await loginPage.navigateToLogin();
    await loginPage.login(config.login.email, config.login.password);

    // Add products to cart
    await cartPage.addProductByName(config.products[0]);
    await page.getByText('Books').first().click();
    await cartPage.addProductByName(config.products[1]);

    // Verify notification and navigate to cart
    await expect(cartPage.notificationBar).toContainText('The product has been added to your shopping cart');
    await cartPage.navigateToCart();

    const allProductRows = page.locator('table.cart tbody tr.cart-item-row');
    await expect(allProductRows, 'The cart should contain exactly two product rows.').toHaveCount(2);

    // Verify product details
    await cartPage.verifyProductDetails(config.products[0], 1);
    await cartPage.verifyProductDetails(config.products[1], 1);

    console.log("PASS: Verified both products are in the cart with the correct quantity of 1.");

    // Accept terms and proceed to checkout
    await cartPage.acceptTermsAndCheckout();

    // Complete checkout process
    await checkoutPage.completeCheckout();

    // Verify order success
    await checkoutPage.verifyOrderSuccess();
});
