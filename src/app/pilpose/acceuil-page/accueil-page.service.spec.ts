import { TestBed } from '@angular/core/testing';

import { AccueilPageService } from './accueil-page.service';

describe('AccueilPageService', () => {
  let service: AccueilPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccueilPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
