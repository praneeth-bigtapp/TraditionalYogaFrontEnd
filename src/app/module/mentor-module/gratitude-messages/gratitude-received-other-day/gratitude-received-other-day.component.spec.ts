import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GratitudeReceivedOtherDayComponent } from './gratitude-received-other-day.component';

describe('GratitudeReceivedOtherDayComponent', () => {
  let component: GratitudeReceivedOtherDayComponent;
  let fixture: ComponentFixture<GratitudeReceivedOtherDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GratitudeReceivedOtherDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GratitudeReceivedOtherDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
