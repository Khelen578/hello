import { TestBed } from '@angular/core/testing';

import { BiscuitService } from './biscuit.service';

describe('BiscuitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BiscuitService = TestBed.get(BiscuitService);
    expect(service).toBeTruthy();
  });
});
