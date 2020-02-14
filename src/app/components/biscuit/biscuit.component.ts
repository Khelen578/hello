import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Biscuit } from 'src/app/models/biscuit';
import { BiscuitService } from 'src/app/services/biscuit.service';


@Component({
  selector: 'app-biscuit',
  templateUrl: './biscuit.component.html',
  styleUrls: ['./biscuit.component.css']
})
export class BiscuitComponent implements OnInit {
  overed = false;

  @Input() biscuit: Biscuit;
  @Output() deleteEmitter: EventEmitter<Biscuit> = new EventEmitter<Biscuit>();
  constructor(private biscuitService: BiscuitService) { }

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
