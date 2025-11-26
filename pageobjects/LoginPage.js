/**
 * Represents the login page and its interactions.
 */
class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.locator('#Email');
        this.passwordInput = page.locator('#Password');
        this.loginButton = page.getByRole('button', { name: 'Log in' });
    }

    /**
     * Navigates to the login page.
     */
    async navigateToLogin() {
        await this.page.goto('https://demowebshop.tricentis.com/cart');
        await this.page.getByRole('link', { name: 'Log in' }).click();
    }

    /**
     * Logs in using the provided email and password.
     * @param {string} email - The email address of the user.
     * @param {string} password - The password of the user.
     */
    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

module.exports = LoginPage;