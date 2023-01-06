import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseprofiletabComponent } from './courseprofiletab.component';

describe('CourseprofiletabComponent', () => {
  let component: CourseprofiletabComponent;
  let fixture: ComponentFixture<CourseprofiletabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseprofiletabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseprofiletabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
