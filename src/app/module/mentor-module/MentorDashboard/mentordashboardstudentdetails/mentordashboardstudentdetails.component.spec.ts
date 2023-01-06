import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentordashboardstudentdetailsComponent } from './mentordashboardstudentdetails.component';

describe('MentordashboardstudentdetailsComponent', () => {
  let component: MentordashboardstudentdetailsComponent;
  let fixture: ComponentFixture<MentordashboardstudentdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentordashboardstudentdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentordashboardstudentdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
