import { TestBed } from '@angular/core/testing';

import { LiveclassService } from './liveclass.service';

describe('LiveclassService', () => {
  let service: LiveclassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveclassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
