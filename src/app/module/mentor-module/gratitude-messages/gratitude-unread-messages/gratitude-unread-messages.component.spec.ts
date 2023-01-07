import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GratitudeUnreadMessagesComponent } from './gratitude-unread-messages.component';

describe('GratitudeUnreadMessagesComponent', () => {
  let component: GratitudeUnreadMessagesComponent;
  let fixture: ComponentFixture<GratitudeUnreadMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GratitudeUnreadMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GratitudeUnreadMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
