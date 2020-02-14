import { Component, OnInit, Input } from '@angular/core';
import { Biscuit } from 'src/app/models/biscuit';
import { BiscuitService } from 'src/app/services/biscuit.service';
import { ActivatedRoute, Router, Event, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-biscuit-list',
  templateUrl: './biscuit-list.component.html',
  styleUrls: ['./biscuit-list.component.css']
})
export class BiscuitListComponent implements OnInit {
  categories: string[];
  biscuits: Biscuit[];
  mobile: boolean;
  isLoading: boolean;
  url: string;
  typeBiscuit = '';
  beautyDisplay: boolean;
  search = '';
  type: string;
  regExType = /^\/biscuits\/type\/.*/;
  regExName = /^\/biscuits\/search\/.*/;
  searchRegex: RegExp;
  validCategorie: boolean;

  constructor(private biscuitService: BiscuitService, private activatedRoute: ActivatedRoute, private routeur: Router) {
    routeur.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.refreshBiscuits();
      }

      if (event instanceof NavigationError) {
        console.log(event.error);
      }
    });
  }

  ngOnInit() {
    this.url = this.routeur.url;
    this.beautyDisplay = this.biscuitService.getDisplay();
    if (window.screen.width < 500) {
      this.mobile = true;
    }
    // j'initialise le chargement a true car on va demander une ressource à notre serveur après
    this.isLoading = true;
    // je demande à mon service d'aller chercher toutes les ressources biscuits
    this.refreshBiscuits();
  }

  refreshBiscuits() {
    this.categories = this.biscuitService.categories;
    this.url = this.routeur.url;
    this.beautyDisplay = this.biscuitService.getDisplay();
    if (this.regExType.test(this.url)) {
      this.type = this.activatedRoute.snapshot.paramMap.get('type');
      this.validCategorie = (this.categories.indexOf(this.type) !== -1);
      return this.biscuitService.getBiscuits().subscribe((data: Biscuit[]) => {
        this.biscuits = data.filter(biscuit => biscuit.categorie === this.type);
        this.isLoading = false;
      });
    } else if (this.regExName.test(this.url)) {
      this.search = this.activatedRoute.snapshot.paramMap.get('querry');
      this.searchRegex = new RegExp(this.search.toUpperCase());
      return this.biscuitService.getBiscuits().subscribe((data: Biscuit[]) => {
        this.biscuits = data.filter(biscuit => this.searchRegex.test(biscuit.nom.toUpperCase()));
        this.isLoading = false;
      });
    }

    return this.biscuitService.getBiscuits().subscribe((data: Biscuit[]) => {
      this.biscuits = data;
      this.isLoading = false;
    });
  }

  changeDisplay() {
    this.beautyDisplay = !this.beautyDisplay;
    this.biscuitService.changeDisplay();
  }

  deleteBiscuit($event) {
    this.biscuitService.deleteBiscuit($event.id).subscribe(then => {
      this.refreshBiscuits();
      this.biscuitService.showToast(`L'élément ${$event.nom} a bien été supprimé`, 'Suppression terminée', 1);
    });
  }

}
