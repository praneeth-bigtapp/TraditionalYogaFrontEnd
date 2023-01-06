import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingRegionsToChiefMentorComponent } from './mapping-regions-to-chief-mentor.component';

describe('MappingRegionsToChiefMentorComponent', () => {
  let component: MappingRegionsToChiefMentorComponent;
  let fixture: ComponentFixture<MappingRegionsToChiefMentorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MappingRegionsToChiefMentorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingRegionsToChiefMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
