import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycourseMaterialComponent } from './mycourse-material.component';

describe('MycourseMaterialComponent', () => {
  let component: MycourseMaterialComponent;
  let fixture: ComponentFixture<MycourseMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MycourseMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MycourseMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
