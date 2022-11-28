import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCourseMatriealsComponent } from './my-course-matrieals.component';

describe('MyCourseMatriealsComponent', () => {
  let component: MyCourseMatriealsComponent;
  let fixture: ComponentFixture<MyCourseMatriealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCourseMatriealsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCourseMatriealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
