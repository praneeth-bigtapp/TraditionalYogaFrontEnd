import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolePermissionComponent } from './role-permission.component';

describe('RolePermissionComponent', () => {
  let component: RolePermissionComponent;
  let fixture: ComponentFixture<RolePermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolePermissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
