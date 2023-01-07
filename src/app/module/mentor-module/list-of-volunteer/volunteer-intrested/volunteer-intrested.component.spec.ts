import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerIntrestedComponent } from './volunteer-intrested.component';

describe('VolunteerIntrestedComponent', () => {
  let component: VolunteerIntrestedComponent;
  let fixture: ComponentFixture<VolunteerIntrestedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteerIntrestedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerIntrestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
