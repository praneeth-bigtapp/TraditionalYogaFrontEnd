import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMycourseMatriealsComponent } from './view-mycourse-matrieals.component';

describe('ViewMycourseMatriealsComponent', () => {
  let component: ViewMycourseMatriealsComponent;
  let fixture: ComponentFixture<ViewMycourseMatriealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMycourseMatriealsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMycourseMatriealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
