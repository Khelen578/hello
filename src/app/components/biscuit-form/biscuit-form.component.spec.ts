import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiscuitFormComponent } from './biscuit-form.component';

describe('BiscuitFormComponent', () => {
  let component: BiscuitFormComponent;
  let fixture: ComponentFixture<BiscuitFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiscuitFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiscuitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
