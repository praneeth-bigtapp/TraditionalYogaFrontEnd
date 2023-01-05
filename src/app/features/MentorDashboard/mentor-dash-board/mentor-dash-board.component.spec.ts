import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorDashBoardComponent } from './mentor-dash-board.component';

describe('MentorDashBoardComponent', () => {
  let component: MentorDashBoardComponent;
  let fixture: ComponentFixture<MentorDashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorDashBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
