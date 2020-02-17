import { browser, by, element } from 'protractor';

export class BiscuitPage {

    sleep() {
        browser.driver.sleep(2500);
    }

    completeAddForm() {
        this.sleep();
        let nom = element.all(by.id('name'));
        let categorie = element.all(by.id('categorie'));
        let image = element.all(by.id('img'));
        nom.sendKeys('test');
        categorie.sendKeys('beurre');
        image.sendKeys('assets/img/madeleine.jpg');
    }

    completeTypeAddForm() {
        let nom = element.all(by.id('name'));
        let image = element.all(by.id('img'));
        nom.sendKeys('typeTest');
        image.sendKeys('assets/img/madeleine.jpg');
    }

    completeEditForm() {
        let nom = element.all(by.id('name'));
        let categorie = element.all(by.id('categorie'));
        let image = element.all(by.id('img'));
        nom.sendKeys('madeleine');
        categorie.sendKeys('beurre');
        image.sendKeys('assets/img/madeleine.jpg');
    }
}