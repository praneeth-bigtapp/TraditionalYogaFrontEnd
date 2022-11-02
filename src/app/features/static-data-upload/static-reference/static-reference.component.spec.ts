import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticReferenceComponent } from './static-reference.component';

describe('StaticReferenceComponent', () => {
  let component: StaticReferenceComponent;
  let fixture: ComponentFixture<StaticReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticReferenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
