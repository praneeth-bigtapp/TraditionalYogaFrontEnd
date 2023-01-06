import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationTabComponent } from './donation-tab.component';

describe('DonationTabComponent', () => {
  let component: DonationTabComponent;
  let fixture: ComponentFixture<DonationTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonationTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
