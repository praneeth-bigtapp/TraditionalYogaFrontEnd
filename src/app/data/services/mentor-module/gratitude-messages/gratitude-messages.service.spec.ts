import { TestBed } from '@angular/core/testing';

import { GratitudeMessagesService } from './gratitude-messages.service';

describe('GratitudeMessagesService', () => {
  let service: GratitudeMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GratitudeMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
