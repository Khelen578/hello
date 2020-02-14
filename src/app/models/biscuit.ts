export class Biscuit {
    id: number;
    nom: string;
    image: string;
    categorie: string;
    constructor(nom = null, categorie = null, image = null) {
        this.categorie = categorie;
        this.id = null;
        this.nom = nom;
        this.image = image;
    }
}
