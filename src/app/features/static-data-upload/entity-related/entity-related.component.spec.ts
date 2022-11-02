import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityRelatedComponent } from './entity-related.component';

describe('EntityRelatedComponent', () => {
  let component: EntityRelatedComponent;
  let fixture: ComponentFixture<EntityRelatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityRelatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityRelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
