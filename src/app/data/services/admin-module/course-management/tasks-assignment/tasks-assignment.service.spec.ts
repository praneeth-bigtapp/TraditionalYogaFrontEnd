import { TestBed } from '@angular/core/testing';

import { OnlineexamService } from './onlineexam.service';

describe('OnlineexamService', () => {
  let service: OnlineexamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineexamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
