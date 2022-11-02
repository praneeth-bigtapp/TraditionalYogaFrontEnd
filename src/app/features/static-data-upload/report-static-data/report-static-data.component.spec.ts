import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStaticDataComponent } from './report-static-data.component';

describe('ReportStaticDataComponent', () => {
  let component: ReportStaticDataComponent;
  let fixture: ComponentFixture<ReportStaticDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportStaticDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportStaticDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
