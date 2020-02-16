import { Component, OnInit } from '@angular/core';
import { BiscuitService } from 'src/app/services/biscuit.service';
import { Router, Event, NavigationEnd, NavigationError, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  search = '';
  url: string;
  type: string;
  isCollapsed = true;
  categories: string[];
  regExType = /^\/biscuits\/type.*/;


  constructor(private routeur: Router, private biscuitService: BiscuitService, private activatedRoute: ActivatedRoute) {
    routeur.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.refreshUrl();
      }
      if (event instanceof NavigationError) {
        console.log(event.error);
      }
    });
  }

  ngOnInit() {
    this.type = '';
    this.refreshUrl();
    this.categories = this.biscuitService.getBiscuitCategories();
  }

  onClick($event) {
    this.isCollapsed = true;
  }
  onSubmit() {
    if (this.search.length > 2) {
      if (this.regExType.test(this.url)) {
        this.type = this.biscuitService.getCurrentType();
        this.routeur.navigate(['/biscuits/type', this.type, this.search]);
      } else {
        this.routeur.navigate(['/biscuits/search', this.search]);
      }
    }
  }
  refreshUrl() {
    this.url = this.routeur.url;
  }
}
