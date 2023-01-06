import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationviewdetailsComponent } from './donationviewdetails.component';

describe('DonationviewdetailsComponent', () => {
  let component: DonationviewdetailsComponent;
  let fixture: ComponentFixture<DonationviewdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonationviewdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationviewdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
