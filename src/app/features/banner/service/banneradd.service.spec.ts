import { TestBed } from '@angular/core/testing';

import { BanneraddService } from './banneradd.service';

describe('BanneraddService', () => {
  let service: BanneraddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BanneraddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
