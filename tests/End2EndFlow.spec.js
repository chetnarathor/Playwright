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


    // await page.getByText('Books').first().click();
    // Add products to cart
   // for (const product of config.products) {
    await cartPage.addProductByName("14.1-inch Laptop");
    await page.getByText('Books').first().click();
    await cartPage.addProductByName("Computing and Internet");
    

    // Verify notification and navigate to cart
    await expect(cartPage.notificationBar).toContainText('The product has been added to your shopping cart');
    await cartPage.navigateToCart();

    // Accept terms and proceed to checkout
    await cartPage.acceptTermsAndCheckout();

    // Complete checkout process
    await checkoutPage.completeCheckout();

    // Verify order success
    await checkoutPage.verifyOrderSuccess();
});
