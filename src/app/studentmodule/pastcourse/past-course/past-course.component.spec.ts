import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastCourseComponent } from './past-course.component';

describe('PastCourseComponent', () => {
  let component: PastCourseComponent;
  let fixture: ComponentFixture<PastCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
