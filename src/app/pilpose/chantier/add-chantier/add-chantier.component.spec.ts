import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChantierComponent } from './add-chantier.component';

describe('AddChantierComponent', () => {
  let component: AddChantierComponent;
  let fixture: ComponentFixture<AddChantierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChantierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChantierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
