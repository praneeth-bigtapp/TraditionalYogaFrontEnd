import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoursedocumentComponent } from './add-coursedocument.component';

describe('AddCoursedocumentComponent', () => {
  let component: AddCoursedocumentComponent;
  let fixture: ComponentFixture<AddCoursedocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCoursedocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCoursedocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
