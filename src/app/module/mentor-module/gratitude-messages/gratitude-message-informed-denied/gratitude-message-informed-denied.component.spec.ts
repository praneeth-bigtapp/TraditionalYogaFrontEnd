import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GratitudeMessageInformedDeniedComponent } from './gratitude-message-informed-denied.component';

describe('GratitudeMessageInformedDeniedComponent', () => {
  let component: GratitudeMessageInformedDeniedComponent;
  let fixture: ComponentFixture<GratitudeMessageInformedDeniedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GratitudeMessageInformedDeniedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GratitudeMessageInformedDeniedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
