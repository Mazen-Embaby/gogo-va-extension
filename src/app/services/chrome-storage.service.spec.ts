import { TestBed } from '@angular/core/testing';

import { ChromeStorageService } from './chrome-storage.service';

describe('ChromeStorageService', () => {
  let service: ChromeStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChromeStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
