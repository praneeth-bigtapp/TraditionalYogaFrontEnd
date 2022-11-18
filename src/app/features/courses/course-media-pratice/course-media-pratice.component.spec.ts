import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMediaPraticeComponent } from './course-media-pratice.component';

describe('CourseMediaPraticeComponent', () => {
  let component: CourseMediaPraticeComponent;
  let fixture: ComponentFixture<CourseMediaPraticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseMediaPraticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMediaPraticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
