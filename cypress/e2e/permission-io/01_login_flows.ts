import {LoginPage} from '../../pageObjects/permission-io/loginPage';


const loginPage = new LoginPage();

const invalid_username = "invalid_email@gmail.com"
const invalid_password = "invalid_password"
const error_message = "Email or Password is incorrect."
const invalid_recaptcha_message = "Invalid Recaptcha"
const passwords = ["password1", "password2", "password3", "password4", "password5"];


describe('Validate Login Flows', function () {

    it('Verify Recaptcha Message in Login flow with invalid credentials', function () {
        loginPage.visit()
        loginPage.passCredentials(invalid_username, invalid_password)
        cy.log("Pass invalid credentials")
        loginPage.acceptAllCookies()
        cy.log("User selects Accept All Cookies")
        loginPage.hitSubmit()
        cy.log("User taps on Login Button")
        loginPage.validateCaptchaMessage(invalid_recaptcha_message)
        cy.log("invalid recaptcha message detected")
    });

    it('Verify Login flow with invalid credentials', function () {
        loginPage.visit()
        loginPage.passCredentials(invalid_username, invalid_password)
        cy.log("Pass invalid credentials")
        loginPage.acceptAllCookies()
        cy.log("User selects Accept All Cookies")
        loginPage.selectRecaptchaUsingIframe()
        cy.log("User selects I am not a robot option")
        cy.wait(40000)
        cy.log("Hold the test Execution for 40 seconds so user solve the captcha manually")
        loginPage.hitSubmit()
        cy.log("User taps on Login Button")
        loginPage.validateMessage(error_message)
        cy.log("Email or Password is incorrect.")
    });

    it('Verify Login flow with valid credentials', function () {
        loginPage.visit()
        loginPage.passCredentials()
        cy.log("Pass valid credentials")
        loginPage.acceptAllCookies()
        cy.log("User selects Accept All Cookies")
        loginPage.selectRecaptchaUsingIframe()
        cy.log("User selects I am not a robot option")
        cy.wait(40000)
        cy.log("Hold the test Execution for 40 seconds so user solve the captcha manually")
        loginPage.hitSubmit()
        cy.log("User taps on Login Button")
        loginPage.verifyUrlIncludesText()
        cy.log("User verified dashboard is loaded successfully")

    });

    it.skip('Test account lockout after multiple failed login attempts.', function () {
        loginPage.visit()
        loginPage.tapLoginButton()
        loginPage.passCredentialsMultipleTimes(invalid_username, passwords);
        cy.log('We can assert the lockout part here')
    });

});