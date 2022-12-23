import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentformComponent } from './enrollmentform.component';

describe('EnrollmentformComponent', () => {
  let component: EnrollmentformComponent;
  let fixture: ComponentFixture<EnrollmentformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollmentformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
