import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SofappsParametrageComponent } from './sofapps-parametrage.component';

describe('SofappsParametrageComponent', () => {
  let component: SofappsParametrageComponent;
  let fixture: ComponentFixture<SofappsParametrageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SofappsParametrageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SofappsParametrageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
