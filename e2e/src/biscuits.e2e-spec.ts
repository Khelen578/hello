import { browser, element, by } from 'protractor';
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
            nbBiscuits = totalRows.length;
            element(by.css('#addBiscuitLink')).click();
            expect(browser.driver.getCurrentUrl()).toContain('biscuit-form');
        });
    });

    it('Test du formulaire d\'ajout', () => {
        browser.get('/biscuit-form');
        page.completeAddForm();
        const submitBtn = element.all(by.css('#submit-button'));
        submitBtn.click().then(() => {
            element.all(by.css('.card')).then(totalNewRows => {
                nbBiscuits += 1;
                const compareBiscuit = nbBiscuits;
                expect(totalNewRows.length).toEqual(compareBiscuit);
            });
        });
    });


    it('Test d\'edition', () => {
        page.sleep();

        const lastEditButton = element.all(by.css('.edit-btn')).last();
        lastEditButton.click().then(fn => {
            page.completeEditForm();
            const submitBtn = element.all(by.css('#submit-button'));
            submitBtn.click().then(() => {
                const newName = element.all(by.css('.biscuit-nom')).last().getText();
                const newCategorie = element.all(by.css('.biscuit-categorie')).last().getText();
                expect(newName).toEqual('Test-edited');
                expect(newCategorie).toEqual('chocolat');
            });
        });
    });

    it('Test de suppression', () => {
        const lastDeleteButton = element.all(by.css('.delete-btn')).last();
        lastDeleteButton.click().then(() => {
            element.all(by.css('.card')).then(totalNewRows => {
                nbBiscuits -= 1;
                const compare = nbBiscuits;
                expect(totalNewRows.length).toEqual(compare);
            });
        });
    });
});
