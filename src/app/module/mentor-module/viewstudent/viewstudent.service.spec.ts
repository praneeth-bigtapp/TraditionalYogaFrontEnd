import { TestBed } from '@angular/core/testing';

import { ViewstudentService } from './viewstudent.service';

describe('ViewstudentService', () => {
  let service: ViewstudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewstudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
