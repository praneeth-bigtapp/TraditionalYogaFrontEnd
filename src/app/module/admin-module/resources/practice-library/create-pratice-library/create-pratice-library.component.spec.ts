import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePraticeLibraryComponent } from './create-pratice-library.component';

describe('CreatePraticeLibraryComponent', () => {
  let component: CreatePraticeLibraryComponent;
  let fixture: ComponentFixture<CreatePraticeLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePraticeLibraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePraticeLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
