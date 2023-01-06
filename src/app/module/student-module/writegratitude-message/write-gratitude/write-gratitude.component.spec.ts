import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteGratitudeComponent } from './write-gratitude.component';

describe('WriteGratitudeComponent', () => {
  let component: WriteGratitudeComponent;
  let fixture: ComponentFixture<WriteGratitudeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriteGratitudeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteGratitudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
