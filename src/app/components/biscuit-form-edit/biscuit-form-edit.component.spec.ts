import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiscuitFormEditComponent } from './biscuit-form-edit.component';

describe('BiscuitFormEditComponent', () => {
  let component: BiscuitFormEditComponent;
  let fixture: ComponentFixture<BiscuitFormEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiscuitFormEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiscuitFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
