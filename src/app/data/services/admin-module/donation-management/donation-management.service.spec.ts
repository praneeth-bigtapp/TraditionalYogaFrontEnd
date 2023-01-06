import { TestBed } from '@angular/core/testing';

import { DonationserviceService } from './donationservice.service';

describe('DonationserviceService', () => {
  let service: DonationserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonationserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
