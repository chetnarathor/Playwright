const { expect } = require('@playwright/test');

/**
 * Represents the checkout page and its interactions.
 */
class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.shippingOptionButton = page.locator('//*[@id="shipping-buttons-container"]/input');
        this.shippingMethodButton = page.locator('//*[@id="shipping-method-buttons-container"]/input');
        this.paymentMethodButton = page.locator('//*[@id="payment-method-buttons-container"]/input');
        this.paymentInfoButton = page.locator('//*[@id="payment-info-buttons-container"]/input');
        this.confirmOrderButton = page.locator('//*[@id="confirm-order-buttons-container"]/input');
        this.orderSuccessMessage = page.locator('.page-body');
    }

    /**
     * Completes the checkout process by navigating through all steps.
     */
    async completeCheckout() {
        await this.continueButton.click();
        await this.shippingOptionButton.click();
        await this.shippingMethodButton.click();
        await this.paymentMethodButton.click();
        await this.paymentInfoButton.click();
        await this.confirmOrderButton.click();
    }

    /**
     * Verifies that the order was successfully placed.
     */
    async verifyOrderSuccess() {
        await expect(this.orderSuccessMessage).toContainText('Your order has been successfully processed!');
    }
}

module.exports = CheckoutPage;