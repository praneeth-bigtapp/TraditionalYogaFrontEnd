import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdHocBloombergRequestComponent } from './ad-hoc-bloomberg-request.component';

describe('AdHocBloombergRequestComponent', () => {
  let component: AdHocBloombergRequestComponent;
  let fixture: ComponentFixture<AdHocBloombergRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdHocBloombergRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdHocBloombergRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
