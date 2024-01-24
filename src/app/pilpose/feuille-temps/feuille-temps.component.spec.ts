import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeuilleTempsComponent } from './feuille-temps.component';

describe('FeuilleTempsComponent', () => {
  let component: FeuilleTempsComponent;
  let fixture: ComponentFixture<FeuilleTempsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeuilleTempsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeuilleTempsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
