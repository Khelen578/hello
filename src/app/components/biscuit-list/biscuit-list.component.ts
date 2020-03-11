import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Biscuit } from 'src/app/models/biscuit';
import { BiscuitService } from 'src/app/services/biscuit.service';
import { ActivatedRoute, Router, Event, NavigationEnd, NavigationError } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-biscuit-list',
  templateUrl: './biscuit-list.component.html',
  styleUrls: ['./biscuit-list.component.css']
})
export class BiscuitListComponent implements OnInit {
  categories: string[];
  biscuits: Biscuit[];
  currentBiscuit: Biscuit;
  modalRef: BsModalRef;
  mobile: boolean;
  isLoading: boolean;
  url: string;
  beautyDisplay: boolean;
  search = '';
  type: string;
  regExType = /^\/biscuits\/type\/.*/;
  regExName = /^\/biscuits\/search\/.*/;
  regExTypeSearch = /^\/biscuits\/.*\/.*\/.*/;
  searchRegex: RegExp;
  valideCategorie: boolean;
  pageSize = 4;
  page = 1;

  constructor( private biscuitService: BiscuitService, private authService: AuthService
    , private activatedRoute: ActivatedRoute, private routeur: Router, private modalService: BsModalService) {
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
    // j'initialise le chargement a true car on va demander une ressource à notre serveur après
    this.isLoading = true;
    // je demande à mon service d'aller chercher toutes les ressources biscuits
    this.refreshBiscuits();
  }

  onDeleteBiscuit(biscuit: Biscuit) {
    this.biscuitService.deleteBiscuit(biscuit.id).subscribe(then => {
      this.refreshBiscuits();
      this.biscuitService.showToast(`L'élément ${biscuit.nom} a bien été supprimé`, 'Suppression terminée', 1);
    });
    this.modalRef.hide();
  }

  checkAuth(destination: string, template: TemplateRef<any>, auth: TemplateRef<any>, biscuit: Biscuit){
    if (this.authService.getIsAuth()) {
      (destination === 'update') ? this.routeur.navigate(['biscuit-form-edit', biscuit.id])
      : this.modalRef = this.modalService.show(template);
    } else {
      this.modalRef = this.modalService.show(auth);
    }
  }

  onLogin() {
    this.modalRef.hide();
    this.routeur.navigate(['/login']);
  }

  openModal(template: TemplateRef<any>, biscuit: Biscuit) {
    if (this.authService.getIsAuth()) {
      this.currentBiscuit = biscuit;
      this.modalRef = this.modalService.show(template);
      } else {
        this.routeur.navigate(['/login']);
      }
  }

  refreshBiscuits() {
    if (window.screen.width < 500) {
      this.mobile = true;
    }
    this.valideCategorie = true;
    this.categories = this.biscuitService.categories;
    this.url = this.routeur.url;
    this.beautyDisplay = this.biscuitService.getDisplay();
    if (this.regExType.test(this.url)) {

      this.type = this.activatedRoute.snapshot.paramMap.get('type');
      this.biscuitService.setCurrentType(this.type);

      if (this.categories.indexOf(this.type) === -1) {
        this.valideCategorie = false;
      }

      if (this.regExTypeSearch.test(this.url)) {
        this.search = this.activatedRoute.snapshot.paramMap.get('querry');
        this.searchRegex = new RegExp(this.search.replace(/[^\w\s]/gi, '').toUpperCase());
        return this.biscuitService.getBiscuits().subscribe((data: Biscuit[]) => {
          this.biscuits = data.filter(biscuit => biscuit.categorie === this.type && this.searchRegex.test(biscuit.nom.toUpperCase()));
          this.isLoading = false;
        });
      }

      return this.biscuitService.getBiscuits().subscribe((data: Biscuit[]) => {
        this.biscuits = data.filter(biscuit => biscuit.categorie === this.type);
        this.isLoading = false;
      });

    } else if (this.regExName.test(this.url)) {
      this.search = this.activatedRoute.snapshot.paramMap.get('querry');
      this.searchRegex = new RegExp(this.search.replace(/[^\w\s]/gi, '').toUpperCase());
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
    this.beautyDisplay = this.biscuitService.changeDisplay();
  }

  deleteBiscuit($event) {
    this.biscuitService.deleteBiscuit($event.id).subscribe(then => {
      this.refreshBiscuits();
      this.biscuitService.showToast(`L'élément ${$event.nom} a bien été supprimé`, 'Suppression terminée', 1);
    });
  }

}
