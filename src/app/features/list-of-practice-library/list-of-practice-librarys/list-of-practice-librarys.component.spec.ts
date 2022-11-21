import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfPracticeLibrarysComponent } from './list-of-practice-librarys.component';

describe('ListOfPracticeLibrarysComponent', () => {
  let component: ListOfPracticeLibrarysComponent;
  let fixture: ComponentFixture<ListOfPracticeLibrarysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfPracticeLibrarysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfPracticeLibrarysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
