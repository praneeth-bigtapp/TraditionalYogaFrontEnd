import { TestBed } from '@angular/core/testing';

import { ScripcturesService } from './scripctures.service';

describe('ScripcturesService', () => {
  let service: ScripcturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScripcturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
