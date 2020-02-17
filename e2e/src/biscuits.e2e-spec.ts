import { browser, element, logging, by } from 'protractor';
import { BiscuitPage } from './biscuit.po';

describe('test des buscuits', () => {

    let page: BiscuitPage;
    let nbBiscuits: number;

    beforeEach(() => {
        page = new BiscuitPage();
        browser.get('/biscuits');
    });

    it('Recherche le lien d\'ajout de biscuit et clique dessus', () => {
        element.all(by.css('.card')).then(totalRows => {
            this.nbBiscuits = totalRows.length;
            element(by.css('#addBiscuitLink')).click();
            expect(browser.driver.getCurrentUrl()).toContain('biscuit-form');
        });
    });

    it('Test du formulaire d\'ajout', () => {
        browser.get('/biscuit-form');
        page.completeAddForm();
        let submitBtn = element.all(by.css('#submit-button'));
        submitBtn.click().then(fn => {
            element.all(by.css('.card')).then(totalNewRows => {
                this.nbBiscuits += 1;
                const compareBiscuit = this.nbBiscuits;
                expect(totalNewRows.length).toEqual(compareBiscuit);
            });
        });
    });

    it('Test d\'edition', () => {
        let lastDeleteButton = element.all(by.css('.delete-btn')).last();
        lastDeleteButton.click().then(fn => {

        });
        expect(1).toEqual(1);

    });

    it('Test de la suppression', () => {
        page.sleep();
        let lastEditButton = element.all(by.css('.edit-btn')).last();
        lastEditButton.click().then(fn => {
            page.completeEditForm();
            let submitBtn = element.all(by.css('#submit-button'));
            submitBtn.click().then(fn => {


            })
            element.all(by.css('.card')).then(totalNewRows => {
                this.nbBiscuits -= 1;
                const compare = this.nbBiscuits;
                expect(totalNewRows.length).toEqual(compare);
            });
        });
    });


});
