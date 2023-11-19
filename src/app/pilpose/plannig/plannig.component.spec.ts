import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannigComponent } from './plannig.component';

describe('PlannigComponent', () => {
  let component: PlannigComponent;
  let fixture: ComponentFixture<PlannigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlannigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
