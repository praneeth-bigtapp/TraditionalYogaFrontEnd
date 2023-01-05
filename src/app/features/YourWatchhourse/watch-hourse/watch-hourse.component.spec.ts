import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchHourseComponent } from './watch-hourse.component';

describe('WatchHourseComponent', () => {
  let component: WatchHourseComponent;
  let fixture: ComponentFixture<WatchHourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchHourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchHourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
