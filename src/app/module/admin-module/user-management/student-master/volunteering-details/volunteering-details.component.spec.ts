import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteeringDetailsComponent } from './volunteering-details.component';

describe('VolunteeringDetailsComponent', () => {
  let component: VolunteeringDetailsComponent;
  let fixture: ComponentFixture<VolunteeringDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteeringDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteeringDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
