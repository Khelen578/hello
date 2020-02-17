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
            this.nbBiscuit = totalRows.length;
            element(by.css('#addBiscuitLink')).click();
            page.sleep();
            expect(browser.driver.getCurrentUrl()).toContain('biscuit-form');
        });
    });

    it('Test le formulaire d\'ajout', () => {
        browser.get('/biscuit-form');
        page.completeAddForm();
        page.sleep();
        let submitBtn = element.all(by.css('#submit-button'));
        submitBtn.click().then(fn => {
            element.all(by.css('.card')).then(totalNewRows => {
                this.nbBiscuit += 1;
                const compareBiscuit = this.nbBiscuit;
                expect(totalNewRows.length).toEqual(compareBiscuit);
                page.sleep();
            });
        });
    });

});
