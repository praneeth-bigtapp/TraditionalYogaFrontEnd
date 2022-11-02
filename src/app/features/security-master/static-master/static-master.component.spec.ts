import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticMasterComponent } from './static-master.component';

describe('StaticMasterComponent', () => {
  let component: StaticMasterComponent;
  let fixture: ComponentFixture<StaticMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
