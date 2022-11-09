import { TestBed } from '@angular/core/testing';

import { SubModuleService } from './sub-module.service';

describe('SubModuleService', () => {
  let service: SubModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
