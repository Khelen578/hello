import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiscuitDetailComponent } from './biscuit-detail.component';

describe('BiscuitDetailComponent', () => {
  let component: BiscuitDetailComponent;
  let fixture: ComponentFixture<BiscuitDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiscuitDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiscuitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
