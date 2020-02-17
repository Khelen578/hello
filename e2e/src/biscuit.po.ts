import { browser, by, element } from 'protractor';

export class BiscuitPage {

    sleep() {
        browser.driver.sleep(2500);
    }

    completeAddForm() {
        this.sleep();
        const nom = element.all(by.id('name'));
        const categorie = element.all(by.id('categorie'));
        const image = element.all(by.id('img'));
        nom.sendKeys('Test');
        categorie.sendKeys('beurre');
        image.sendKeys('assets/img/madeleine.jpg');
    }

    completeTypeAddForm() {
        const nom = element.all(by.id('name'));
        const image = element.all(by.id('img'));
        nom.sendKeys('typeTest');
        image.sendKeys('assets/img/madeleine.jpg');
    }


    completeEditForm() {
        const nom = element.all(by.id('name'));
        const categorie = element.all(by.id('categorie'));
        const image = element.all(by.id('img'));
        nom.sendKeys('-edited');
        categorie.sendKeys('chocolat');
        image.sendKeys('assets/img/madeleine.jpg');
    }
}
