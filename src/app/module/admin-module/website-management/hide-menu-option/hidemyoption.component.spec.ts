import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HidemyoptionComponent } from './hidemyoption.component';

describe('HidemyoptionComponent', () => {
  let component: HidemyoptionComponent;
  let fixture: ComponentFixture<HidemyoptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HidemyoptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HidemyoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
