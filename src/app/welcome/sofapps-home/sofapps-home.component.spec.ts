import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SofappsHomeComponent } from './sofapps-home.component';

describe('SofappsHomeComponent', () => {
  let component: SofappsHomeComponent;
  let fixture: ComponentFixture<SofappsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SofappsHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SofappsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
