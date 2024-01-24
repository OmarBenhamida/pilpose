import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeuilleComponent } from './add-feuille.component';

describe('AddFeuilleComponent', () => {
  let component: AddFeuilleComponent;
  let fixture: ComponentFixture<AddFeuilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFeuilleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFeuilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
