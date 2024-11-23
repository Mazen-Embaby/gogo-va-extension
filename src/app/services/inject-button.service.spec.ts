import { TestBed } from '@angular/core/testing';

import { InjectButtonService } from './inject-button.service';

describe('InjectButtonService', () => {
  let service: InjectButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InjectButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
