import { Component, OnInit, Input, Output } from '@angular/core';
import { BiscuitService } from 'src/app/services/biscuit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  search = '';
  isCollapsed = true;
  categories: string[];
  mobile: boolean;


  constructor(private routeur: Router, private biscuitService: BiscuitService) {

  }
  onClick($event) {
    this.isCollapsed = true;
  }

  ngOnInit() {
    this.categories = this.biscuitService.getBiscuitCategories();
  }
  onSubmit() {
    if (this.search.length > 2) {
      this.routeur.navigate(['/biscuits/search', this.search]);
    }
  }

}
