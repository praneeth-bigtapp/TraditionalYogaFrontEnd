import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsStudentInformationComponent } from './details-student-information.component';

describe('DetailsStudentInformationComponent', () => {
  let component: DetailsStudentInformationComponent;
  let fixture: ComponentFixture<DetailsStudentInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsStudentInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsStudentInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
