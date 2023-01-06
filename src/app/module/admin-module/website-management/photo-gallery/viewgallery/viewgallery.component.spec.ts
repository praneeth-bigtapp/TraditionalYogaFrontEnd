import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewgalleryComponent } from './viewgallery.component';

describe('ViewgalleryComponent', () => {
  let component: ViewgalleryComponent;
  let fixture: ComponentFixture<ViewgalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewgalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewgalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
