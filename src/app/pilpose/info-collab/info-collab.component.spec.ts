import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCollabComponent } from './info-collab.component';

describe('InfoCollabComponent', () => {
  let component: InfoCollabComponent;
  let fixture: ComponentFixture<InfoCollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoCollabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoCollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
