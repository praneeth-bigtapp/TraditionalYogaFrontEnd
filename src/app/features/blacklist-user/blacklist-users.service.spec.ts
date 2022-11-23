import { TestBed } from '@angular/core/testing';

import { BlacklistUsersService } from './blacklist-users.service';

describe('BlacklistUsersService', () => {
  let service: BlacklistUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlacklistUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
