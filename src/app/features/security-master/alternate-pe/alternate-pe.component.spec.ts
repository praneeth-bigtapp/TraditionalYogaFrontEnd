import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternatePEComponent } from './alternate-pe.component';

describe('AlternatePEComponent', () => {
  let component: AlternatePEComponent;
  let fixture: ComponentFixture<AlternatePEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlternatePEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternatePEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
