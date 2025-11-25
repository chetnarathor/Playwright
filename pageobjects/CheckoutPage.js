const { expect } = require('@playwright/test');

class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        // this.shippingOption = page.locator('#shippingoption_1');
        this.shippingOptionButton = page.locator('//*[@id="shipping-buttons-container"]/input');
        // this.paymentMethod = page.locator('#paymentmethod_0');
        this.shippingMethodButton = page.locator('//*[@id="shipping-method-buttons-container"]/input');
        this.paymentMethodButton = page.locator('//*[@id="payment-method-buttons-container"]/input');
        this.paymentInfoButton = page.locator('//*[@id="payment-info-buttons-container"]/input');
        this.confirmOrderButton = page.locator('//*[@id="confirm-order-buttons-container"]/input');
        this.orderSuccessMessage = page.locator('.page-body');
    }
//     const shippingMethodBtn = page.locator('//*[@id="shipping-buttons-container"]/input');
    // await shippingMethodBtn.click();
    async completeCheckout() {
        // Billing
        await this.continueButton.click();

        // Shipping
        // await this.shippingOption.click();
        await this.shippingOptionButton.click();

        //Shipping method
        await this.shippingMethodButton.click();
        // Payment Method
        // await this.paymentMethod.click();
        await this.paymentMethodButton.click();

        // Payment Info
        await this.paymentInfoButton.click();

        // Confirm Order
        await this.confirmOrderButton.click();
    }

    async verifyOrderSuccess() {
        await expect(this.orderSuccessMessage).toContainText('Your order has been successfully processed!');
    }
}

module.exports = CheckoutPage;