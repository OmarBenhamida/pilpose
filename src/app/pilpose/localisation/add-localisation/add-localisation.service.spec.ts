import { TestBed } from '@angular/core/testing';

import { AddLocalisationService } from './add-localisation.service';

describe('AddLocalisationService', () => {
  let service: AddLocalisationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddLocalisationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
