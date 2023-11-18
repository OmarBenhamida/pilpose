import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SofappsPasswordComponent } from './sofapps-password.component';

describe('SofappsPasswordComponent', () => {
  let component: SofappsPasswordComponent;
  let fixture: ComponentFixture<SofappsPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SofappsPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SofappsPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
