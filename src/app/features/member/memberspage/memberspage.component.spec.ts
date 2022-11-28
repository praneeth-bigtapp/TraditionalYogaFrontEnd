import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberspageComponent } from './memberspage.component';

describe('MemberspageComponent', () => {
  let component: MemberspageComponent;
  let fixture: ComponentFixture<MemberspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberspageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
