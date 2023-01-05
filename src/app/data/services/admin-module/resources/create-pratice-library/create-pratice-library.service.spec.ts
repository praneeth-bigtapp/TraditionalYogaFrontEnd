import { TestBed } from '@angular/core/testing';

import { CreatepraticelibraryService } from './createpraticelibrary.service';

describe('CreatepraticelibraryService', () => {
  let service: CreatepraticelibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatepraticelibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
