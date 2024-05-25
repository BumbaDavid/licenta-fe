import { TestBed } from '@angular/core/testing';

import { UserCvService } from './user-cv.service';

describe('UserCVServicesService', () => {
  let service: UserCvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
