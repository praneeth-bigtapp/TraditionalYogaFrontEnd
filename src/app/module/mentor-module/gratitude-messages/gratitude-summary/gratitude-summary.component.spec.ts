import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GratitudeSummaryComponent } from './gratitude-summary.component';

describe('GratitudeSummaryComponent', () => {
  let component: GratitudeSummaryComponent;
  let fixture: ComponentFixture<GratitudeSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GratitudeSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GratitudeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
