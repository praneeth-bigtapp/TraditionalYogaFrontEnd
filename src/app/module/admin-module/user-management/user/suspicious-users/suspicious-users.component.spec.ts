import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspiciousUsersComponent } from './suspicious-users.component';

describe('SuspiciousUsersComponent', () => {
  let component: SuspiciousUsersComponent;
  let fixture: ComponentFixture<SuspiciousUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspiciousUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspiciousUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
