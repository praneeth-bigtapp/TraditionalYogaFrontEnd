import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetMixReportComponent } from './asset-mix-report.component';

describe('AssetMixReportComponent', () => {
  let component: AssetMixReportComponent;
  let fixture: ComponentFixture<AssetMixReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetMixReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetMixReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
