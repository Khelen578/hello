import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Biscuit } from 'src/app/models/biscuit';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-biscuit',
  templateUrl: './biscuit.component.html',
  styleUrls: ['./biscuit.component.css']
})
export class BiscuitComponent implements OnInit {

  @Input() biscuit: Biscuit;
  @Output() deleteEmitter: EventEmitter<Biscuit> = new EventEmitter<Biscuit>();
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService,private routeur: Router,private authService: AuthService) { }

  ngOnInit() {

  }

  onDeleteBiscuit(biscuit: Biscuit) {
    this.deleteEmitter.emit(this.biscuit);
    this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>) {
    if (this.authService.getIsAuth()) {
      this.modalRef = this.modalService.show(template);
      } else {
        this.routeur.navigate(['/login']);
      }
  }

}
