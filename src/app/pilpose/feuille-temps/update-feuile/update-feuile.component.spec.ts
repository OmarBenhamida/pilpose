import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFeuileComponent } from './update-feuile.component';

describe('UpdateFeuileComponent', () => {
  let component: UpdateFeuileComponent;
  let fixture: ComponentFixture<UpdateFeuileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFeuileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFeuileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
