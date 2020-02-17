import { Component, OnInit } from '@angular/core';
import { Biscuit } from 'src/app/models/biscuit';
import { BiscuitService } from 'src/app/services/biscuit.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-biscuit-form',
  templateUrl: './biscuit-form.component.html',
  styleUrls: ['./biscuit-form.component.css']
})
export class BiscuitFormComponent implements OnInit {
  formBiscuit: Biscuit;
  categories: string[];
  type = '';

  constructor(private biscuitService: BiscuitService, private routeur: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.type = this.activatedRoute.snapshot.paramMap.get('type') || '';
    this.formBiscuit = new Biscuit();
    this.formBiscuit.categorie = this.type;
    this.categories = this.biscuitService.getBiscuitCategories();
  }

  onSubmit() {
    this.biscuitService.addBiscuit(this.formBiscuit).subscribe(then => {
      this.biscuitService.showToast(`L'élément ${this.formBiscuit.nom} a bien été créé`, 'Création terminée', 1);
      this.routeur.navigate((this.type === '') ? ['/biscuits'] : ['/biscuits/type/', this.type]);
    });
  }

  goBack() {
    // expression ternaire: (test) ? si vrai : si faux
    this.routeur.navigate((this.type === '') ? ['/biscuits'] : ['/biscuits/type/', this.type]);
  }

}
