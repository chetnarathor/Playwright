class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.locator('#Email');
        this.passwordInput = page.locator('#Password');
        this.loginButton = page.getByRole('button', { name: 'Log in' });
    }

    async navigateToLogin() {
        await this.page.goto('https://demowebshop.tricentis.com/cart');
        await this.page.getByRole('link', { name: 'Log in' }).click();
    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

module.exports = LoginPage;