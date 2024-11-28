// @ts-ignore
import {faker} from '@faker-js/faker';

export class BasePage {
    visit(url: string) {
        cy.visit(url);
    }

    verifyUrlIncludesText(text: string = 'earn') {
        return cy.url().should('include', text);
    }

    waitUntilElementIsVisible(selector: any, timeout = 10000, interval = 500) {
        cy.waitUntil(() => cy.get(selector).should('be.visible'), {
            timeout: timeout,
            interval: interval
        });
    }

    getInputFieldAndTypeValue(inputFieldElem: any, value: string) {
        return cy.get(inputFieldElem).clear().type(value);
    }

    getElementAndClick(selector: any) {
        return cy.get(selector).click({force: true});
    }


    elementContainsSpecificText(selector: any, text: string) {
        return cy.get(selector).should('contain.text', text);
    }

    clickElementBasedOnText(selector: any, text: string) {
        return cy.contains(selector, text).click();
    }

    verifyElementBasedOnText(selector: any, text: string) {
        return cy.contains(selector, text)
    }

    waitUntilElementIsEnabled(selector: any, timeout = 10000, interval = 500) {
        cy.waitUntil(() =>
                cy.get(selector).then($element => !$element.prop('disabled')),
            {
                timeout: timeout,
                interval: interval
            }
        );
    }


}