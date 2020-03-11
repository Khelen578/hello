import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Biscuit } from 'src/app/models/biscuit';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router, Event, NavigationEnd } from '@angular/router';
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
  isAuth = false;

  constructor(private modalService: BsModalService, private routeur: Router, private authService: AuthService) {
    routeur.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.isAuth = this.authService.getIsAuth();
      }
    });
  }

  ngOnInit() {
    this.isAuth = this.authService.getIsAuth();
  }

  checkAuth(destination: string, template: TemplateRef<any>, auth: TemplateRef<any>) {
    if (this.authService.getIsAuth()) {
      (destination === 'update') ? this.routeur.navigate(['biscuit-form-edit', this.biscuit.id])
      : this.modalRef = this.modalService.show(template);
    } else {
      this.modalRef = this.modalService.show(auth);
    }
  }

  onDeleteBiscuit(biscuit: Biscuit) {
    this.deleteEmitter.emit(this.biscuit);
    this.modalRef.hide();
  }

  onLogin() {
    this.modalRef.hide();
    this.routeur.navigate(['/login']);
  }

}
