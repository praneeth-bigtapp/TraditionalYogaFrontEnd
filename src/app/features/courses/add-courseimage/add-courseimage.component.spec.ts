import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseimageComponent } from './add-courseimage.component';

describe('AddCourseimageComponent', () => {
  let component: AddCourseimageComponent;
  let fixture: ComponentFixture<AddCourseimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCourseimageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
