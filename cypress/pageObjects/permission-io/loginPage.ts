/// <reference types="Cypress" />

require('dotenv').config()
import {BasePage} from '../commonFeatures/basePage';

const email = '#username';
const loginButton = 'button';
const password = '#password';
const errorMessage = '#input-error';
const recaptchaError = '.alert-error span'
const hitLogin = 'input[name="login"]'
const acceptCookies = 'button[id*="accept-btn"]'
const recaptchaIframeSelector = 'iframe[title="reCAPTCHA"]';
const recaptchaCheckboxSelector = '.recaptcha-checkbox-border';

export class LoginPage extends BasePage {
    visit() {
        cy.visit(Cypress.env('BASE_URL'), {retryOnStatusCodeFailure: true, retryOnNetworkFailure: true});
    }

    tapLoginButton() {
        this.clickElementBasedOnText(loginButton, "Log in")
    }

    hitSubmit() {
        this.getElementAndClick(hitLogin)
    }

    acceptAllCookies() {
        this.getElementAndClick(acceptCookies)
    }

    validateMessage(message: string) {
        this.elementContainsSpecificText(errorMessage, message);
    }

    validateCaptchaMessage(message: string) {
        this.verifyElementBasedOnText(recaptchaError, message);
    }

    selectRecaptchaUsingIframe() {
        cy.get(recaptchaIframeSelector)
            .its('0.contentDocument.body')
            .should('not.be.empty')
            .then(cy.wrap) // Wrap the iframe's body for further Cypress chaining
            .find(recaptchaCheckboxSelector) // Find the reCAPTCHA checkbox
            .click({force: true}); // Click on the checkbox
    }

    addEmailAndPassword(user: string, pass: string) {
        this.getInputFieldAndTypeValue(email, user);
        this.getInputFieldAndTypeValue(password, pass);
    }

    passCredentials(user: string = Cypress.env("USER_NAME"), pass: string = Cypress.env("PASSWORD")) {
        this.tapLoginButton()
        this.addEmailAndPassword(user, pass)
    }

    passCredentialsMultipleTimes(user: string, passwords: string[]) {
        passwords.forEach((pass, index) => {
            cy.log(`Attempt ${index + 1}: Using password - ${pass}`);
            this.addEmailAndPassword(user, pass);
            cy.log("Pass invalid credentials");
            this.acceptAllCookies();
            cy.log("User selects Accept All Cookies");
            this.selectRecaptchaUsingIframe();
            cy.log("User selects I am not a robot option");
            cy.wait(40000); // Adjust this if manual interaction is required
            cy.log("Hold the test execution for 40 seconds so user solves the captcha manually");
            this.hitSubmit();
            cy.log("User taps on Login Button");
        });
    }

}