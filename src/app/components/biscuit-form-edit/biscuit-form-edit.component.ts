import { Component, OnInit } from '@angular/core';
import { Biscuit } from 'src/app/models/biscuit';
import { Location } from '@angular/common';
import { BiscuitService } from 'src/app/services/biscuit.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-biscuit-form-edit',
  templateUrl: './biscuit-form-edit.component.html',
  styleUrls: ['./biscuit-form-edit.component.css']
})
export class BiscuitFormEditComponent implements OnInit {
  formBiscuit: Biscuit;
  categories: string[];
  isLoading: boolean;

  constructor(private biscuitService: BiscuitService, private location: Location, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.isLoading = true;
    this.biscuitService.getBiscuitById(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe((data: Biscuit) => {
      this.formBiscuit = data;
      this.isLoading = false;
    });
    this.categories = this.biscuitService.getBiscuitCategories();
  }

  onSubmit() {
    this.biscuitService.editBiscuit(this.formBiscuit).subscribe(then => {
      this.biscuitService.showToast(`L'élément ${this.formBiscuit.nom} a bien été édité`, 'Edition terminée', 2);
      this.location.back();
    });

  }
  goBack() {
    this.location.back();
  }

}
