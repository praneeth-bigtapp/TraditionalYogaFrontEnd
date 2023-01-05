import { TestBed } from '@angular/core/testing';

import { MappingRegionsToChiefMentorService } from './mapping-regions-to-chief-mentor.service';

describe('MappingRegionsToChiefMentorService', () => {
  let service: MappingRegionsToChiefMentorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MappingRegionsToChiefMentorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
