import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingresourcesComponent } from './sortingresources.component';

describe('SortingresourcesComponent', () => {
  let component: SortingresourcesComponent;
  let fixture: ComponentFixture<SortingresourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortingresourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortingresourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
