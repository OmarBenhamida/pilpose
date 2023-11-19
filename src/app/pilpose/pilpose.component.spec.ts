import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilposeComponent } from './pilpose.component';

describe('PilposeComponent', () => {
  let component: PilposeComponent;
  let fixture: ComponentFixture<PilposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PilposeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PilposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
