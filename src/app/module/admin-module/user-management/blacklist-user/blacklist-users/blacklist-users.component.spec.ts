import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlacklistUsersComponent } from './blacklist-users.component';

describe('BlacklistUsersComponent', () => {
  let component: BlacklistUsersComponent;
  let fixture: ComponentFixture<BlacklistUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlacklistUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlacklistUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
