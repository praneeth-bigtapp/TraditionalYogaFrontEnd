import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapCourseComponent } from './map-course.component';

describe('MapCourseComponent', () => {
  let component: MapCourseComponent;
  let fixture: ComponentFixture<MapCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
