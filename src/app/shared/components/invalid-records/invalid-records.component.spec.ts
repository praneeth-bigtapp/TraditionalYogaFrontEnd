import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidRecordsComponent } from './invalid-records.component';

describe('InvalidRecordsComponent', () => {
  let component: InvalidRecordsComponent;
  let fixture: ComponentFixture<InvalidRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
