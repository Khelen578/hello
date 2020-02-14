import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiscuitListComponent } from './biscuit-list.component';

describe('BiscuitListComponent', () => {
  let component: BiscuitListComponent;
  let fixture: ComponentFixture<BiscuitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiscuitListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiscuitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
