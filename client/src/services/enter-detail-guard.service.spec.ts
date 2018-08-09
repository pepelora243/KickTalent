import { TestBed, inject } from '@angular/core/testing';

import { EnterDetailGuardService } from './enter-detail-guard.service';

describe('EnterDetailGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnterDetailGuardService]
    });
  });

  it('should be created', inject([EnterDetailGuardService], (service: EnterDetailGuardService) => {
    expect(service).toBeTruthy();
  }));
});
