import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiscuitComponent } from './biscuit.component';

describe('BiscuitComponent', () => {
  let component: BiscuitComponent;
  let fixture: ComponentFixture<BiscuitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiscuitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiscuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
