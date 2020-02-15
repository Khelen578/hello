import { Component, OnInit } from '@angular/core';
import { Biscuit } from 'src/app/models/biscuit';
import { ActivatedRoute } from '@angular/router';
import { BiscuitService } from 'src/app/services/biscuit.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-biscuit-detail',
  templateUrl: './biscuit-detail.component.html',
  styleUrls: ['./biscuit-detail.component.css']
})
export class BiscuitDetailComponent implements OnInit {

  biscuit: Biscuit;
  isLoading: boolean;

  constructor(private activatedRoute: ActivatedRoute, private biscuitService: BiscuitService, private location: Location) { }

  ngOnInit() {
    this.isLoading = true;
    this.biscuitService.getBiscuitById(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe((data: Biscuit) => {
      this.biscuit = data;
      this.isLoading = false;
    });

  }
  goBack() {
    this.location.back();
  }

}
