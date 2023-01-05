import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PearlwidsomComponent } from './pearlwidsom.component';

describe('PearlwidsomComponent', () => {
  let component: PearlwidsomComponent;
  let fixture: ComponentFixture<PearlwidsomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PearlwidsomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PearlwidsomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
