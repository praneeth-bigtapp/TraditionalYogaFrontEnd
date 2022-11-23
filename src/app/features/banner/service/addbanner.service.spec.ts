import { TestBed } from '@angular/core/testing';

import { AddbannerService } from './addbanner.service';

describe('AddbannerService', () => {
  let service: AddbannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddbannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
