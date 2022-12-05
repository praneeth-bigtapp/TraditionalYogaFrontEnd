import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegioncreationComponent } from './regioncreation.component';

describe('RegioncreationComponent', () => {
  let component: RegioncreationComponent;
  let fixture: ComponentFixture<RegioncreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegioncreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegioncreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
