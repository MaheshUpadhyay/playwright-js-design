export class PersonalDetailsPage {
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.locator("input[name='firstName']");
        this.lastNameInput = page.locator("input[name='lastName']");
        this.emailInput = page.locator("input[name='email']");
        this.phoneInput = page.locator("input[name='phone']");
        this.addressInput = page.locator("input[name='address']");
        this.cityInput = page.locator("input[name='city']");
        this.stateInput = page.locator("input[name='state']");
        this.zipInput = page.locator("input[name='zip']");
        this.countryInput = page.locator("input[name='country']");
        this.submitButton = page.locator('text=SUBMIT');
    }

    async navigate() {
        await this.page.goto('https://example.com/personal-details');
    }

    async enterFirstName(firstName) {
        await this.firstNameInput.fill(firstName);
    }

    async enterLastName(lastName) {
        await this.lastNameInput.fill(lastName);
    }

    async enterEmail(email) {
        await this.emailInput.fill(email);
    }

    async enterPhone(phone) {
        await this.phoneInput.fill(phone);
    }

    async enterAddress(address) {
        await this.addressInput.fill(address);
    }

    async enterCity(city) {
        await this.cityInput.fill(city);
    }

    async enterState(state) {
        await this.stateInput.fill(state);
    }

    async enterZip(zip) {
        await this.zipInput.fill(zip);
    }

    async enterCountry(country) {
        await this.countryInput.fill(country);
    }

    async clickSubmit() {
        await this.submitButton.click();
    }

    async fillPersonalDetails(details) {
        const { firstName, lastName, email, phone, address, city, state, zip, country } = details;
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterEmail(email);
        await this.enterPhone(phone);
        await this.enterAddress(address);
        await this.enterCity(city);
        await this.enterState(state);
        await this.enterZip(zip);
        await this.enterCountry(country);
        await this.clickSubmit();
    }
}