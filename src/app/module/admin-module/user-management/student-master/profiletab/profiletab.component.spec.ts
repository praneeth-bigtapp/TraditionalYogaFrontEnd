import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiletabComponent } from './profiletab.component';

describe('ProfiletabComponent', () => {
  let component: ProfiletabComponent;
  let fixture: ComponentFixture<ProfiletabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfiletabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfiletabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
