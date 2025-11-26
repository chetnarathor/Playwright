import { Page, expect } from '@playwright/test';

/**
 * Represents the shopping cart page and its interactions.
 */
class CartPage {
    constructor(page) {
        this.page = page;
        this.notificationBar = page.locator('#bar-notification');
        this.termsOfServiceCheckbox = page.locator('#termsofservice');
        this.checkoutButton = page.getByRole('button', { name: 'checkout' });
    }

    /**
     * Adds a product to the cart using its alt text.
     * @param {string} productAltText - The alt text of the product image.
     */
    async addProductToCart(productAltText) {
        await this.page.getByAltText(productAltText).click();
        await this.page.locator("input[value='Add to cart']").first().click();
    }

    /**
     * Navigates to the shopping cart page.
     */
    async navigateToCart() {
        await this.notificationBar.getByRole('link', { name: 'shopping cart' }).click();
    }

    /**
     * Accepts the terms of service and proceeds to checkout.
     */
    async acceptTermsAndCheckout() {
        await this.termsOfServiceCheckbox.click();
        await this.checkoutButton.click();
    }

    /**
     * Adds a product to the cart by its name.
     * @param {string} name - The name of the product.
     */
    async addProductByName(name) {
        const productLocator = this.page.locator(`.product-item:has-text("${name}")`);
        const addToCartButton = productLocator.locator('text=Add to cart').first();
        await addToCartButton.waitFor({ state: 'visible', timeout: 5000 });
        await addToCartButton.click();
        await expect(this.page.locator('body')).toContainText(/shopping cart/i, { timeout: 8000 });
    }

    /**
     * Verifies the product details in the cart.
     * @param {string} productName - The name of the product.
     * @param {number} expectedQuantity - The expected quantity of the product.
     */
    async verifyProductDetails(productName, expectedQuantity) {
        const productRowLocator = this.page.locator('table.cart tbody tr.cart-item-row', {
            has: this.page.getByRole('link', { name: productName })
        });

        await expect(productRowLocator, `Product '${productName}' must be present in the cart.`).toBeVisible();

        const qtyInputField = productRowLocator.locator('.qty-input');
        await expect(qtyInputField, `Quantity for ${productName} must be ${expectedQuantity}`)
            .toHaveValue(expectedQuantity.toString());
    }
}

module.exports = CartPage;