import { TestBed } from '@angular/core/testing';

import { WebsitemanagementService } from './websitemanagement.service';

describe('WebsitemanagementService', () => {
  let service: WebsitemanagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsitemanagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
