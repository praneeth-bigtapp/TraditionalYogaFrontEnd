import { TestBed } from '@angular/core/testing';

import { TestimonialsService } from './testimonials.service';

describe('TestimonialsService', () => {
  let service: TestimonialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestimonialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
