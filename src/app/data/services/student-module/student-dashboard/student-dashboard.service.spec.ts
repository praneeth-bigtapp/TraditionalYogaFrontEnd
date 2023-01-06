import { TestBed } from '@angular/core/testing';

import { StudentDashboardService } from './student-dashboard.service';

describe('StudentDashboardService', () => {
  let service: StudentDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
