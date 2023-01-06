import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineexamComponent } from './onlineexam.component';

describe('OnlineexamComponent', () => {
  let component: OnlineexamComponent;
  let fixture: ComponentFixture<OnlineexamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineexamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineexamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
