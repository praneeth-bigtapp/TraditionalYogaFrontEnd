import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentenrollmentComponent } from './studentenrollment.component';

describe('StudentenrollmentComponent', () => {
  let component: StudentenrollmentComponent;
  let fixture: ComponentFixture<StudentenrollmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentenrollmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentenrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
