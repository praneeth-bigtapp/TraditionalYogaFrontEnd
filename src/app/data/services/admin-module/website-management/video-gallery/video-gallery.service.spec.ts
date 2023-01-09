import { TestBed } from '@angular/core/testing';

import { VideoGalleryService } from './video-gallery.service';

describe('VideoGalleryService', () => {
  let service: VideoGalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoGalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
