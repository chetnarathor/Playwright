import { Page, expect } from '@playwright/test';

class CartPage {
    constructor(page) {
        this.page = page;
        this.notificationBar = page.locator('#bar-notification');
        this.termsOfServiceCheckbox = page.locator('#termsofservice');
        this.checkoutButton = page.getByRole('button', { name: 'checkout' });
    }

    async addProductToCart(productAltText) {
        await this.page.getByAltText(productAltText).click();
        await this.page.locator("input[value='Add to cart']").first().click();
    }

    async navigateToCart() {
        await this.notificationBar.getByRole('link', { name: 'shopping cart' }).click();
    }

    async acceptTermsAndCheckout() {
        await this.termsOfServiceCheckbox.click();
        await this.checkoutButton.click();
    }

    async addProductByName(name) {
        const productLocator = this.page.locator(`.product-item:has-text("${name}")`);
        // await productLocator.first().waitFor({ state: 'visible', timeout: 8000 });

        // Locate the Add to cart button
        const addToCartButton = productLocator.locator('text=Add to cart').first();
        await addToCartButton.waitFor({ state: 'visible', timeout: 5000 });

        // Click Add to cart
        await addToCartButton.click();

        await expect(this.page.locator('body'))
            .toContainText(/shopping cart/i, { timeout: 8000 });
    }
}

module.exports = CartPage;