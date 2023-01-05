import { TestBed } from '@angular/core/testing';

import { BannerviewService } from './bannerview.service';

describe('BannerviewService', () => {
  let service: BannerviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BannerviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
