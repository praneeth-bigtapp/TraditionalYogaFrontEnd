import { TestBed } from '@angular/core/testing';

import { MapuserService } from './mapuser.service';

describe('MapuserService', () => {
  let service: MapuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
