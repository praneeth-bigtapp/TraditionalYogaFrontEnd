import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpurchaseInformationComponent } from './epurchase-information.component';

describe('EpurchaseInformationComponent', () => {
  let component: EpurchaseInformationComponent;
  let fixture: ComponentFixture<EpurchaseInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpurchaseInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpurchaseInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
