import { TestBed } from '@angular/core/testing';

import { BannermainService } from './bannermain.service';

describe('BannermainService', () => {
  let service: BannermainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BannermainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
