import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GratitudeMessageComponent } from './gratitude-message.component';

describe('GratitudeMessageComponent', () => {
  let component: GratitudeMessageComponent;
  let fixture: ComponentFixture<GratitudeMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GratitudeMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GratitudeMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
