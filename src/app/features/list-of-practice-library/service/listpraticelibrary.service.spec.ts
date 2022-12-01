import { TestBed } from '@angular/core/testing';

import { ListpraticelibraryService } from './listpraticelibrary.service';

describe('ListpraticelibraryService', () => {
  let service: ListpraticelibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListpraticelibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
