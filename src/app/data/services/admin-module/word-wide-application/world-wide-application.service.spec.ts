import { TestBed } from '@angular/core/testing';

import { WorldWideApplicationService } from './world-wide-application.service';

describe('WorldWideApplicationService', () => {
  let service: WorldWideApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorldWideApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
