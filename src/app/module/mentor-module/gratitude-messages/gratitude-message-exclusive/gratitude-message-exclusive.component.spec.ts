import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GratitudeMessageExclusiveComponent } from './gratitude-message-exclusive.component';

describe('GratitudeMessageExclusiveComponent', () => {
  let component: GratitudeMessageExclusiveComponent;
  let fixture: ComponentFixture<GratitudeMessageExclusiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GratitudeMessageExclusiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GratitudeMessageExclusiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
