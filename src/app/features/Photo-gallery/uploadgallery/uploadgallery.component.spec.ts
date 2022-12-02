import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadgalleryComponent } from './uploadgallery.component';

describe('UploadgalleryComponent', () => {
  let component: UploadgalleryComponent;
  let fixture: ComponentFixture<UploadgalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadgalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadgalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
