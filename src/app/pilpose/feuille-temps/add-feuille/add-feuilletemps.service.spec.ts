import { TestBed } from '@angular/core/testing';

import { AddFeuilletempsService } from './add-feuilletemps.service';

describe('AddFeuilletempsService', () => {
  let service: AddFeuilletempsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddFeuilletempsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
