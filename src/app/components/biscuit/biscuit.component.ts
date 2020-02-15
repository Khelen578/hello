import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Biscuit } from 'src/app/models/biscuit';


@Component({
  selector: 'app-biscuit',
  templateUrl: './biscuit.component.html',
  styleUrls: ['./biscuit.component.css']
})
export class BiscuitComponent implements OnInit {
  overed = false;

  @Input() biscuit: Biscuit;
  @Output() deleteEmitter: EventEmitter<Biscuit> = new EventEmitter<Biscuit>();
  constructor() { }

  ngOnInit() {

  }
  overStartEvent() {
    this.overed = true;
  }
  overEndEvent() {
    this.overed = false;
  }

  onDeleteBiscuit(biscuit: Biscuit) {
    this.deleteEmitter.emit(biscuit);
  }

}
