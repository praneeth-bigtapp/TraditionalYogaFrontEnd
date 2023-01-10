import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExemptionCourseComponent } from './manage-exemption-course.component';

describe('ManageExemptionCourseComponent', () => {
  let component: ManageExemptionCourseComponent;
  let fixture: ComponentFixture<ManageExemptionCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageExemptionCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageExemptionCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
