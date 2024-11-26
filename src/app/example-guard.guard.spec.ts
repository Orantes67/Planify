import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { exampleGuardGuard } from './example-guard.guard';

describe('exampleGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => exampleGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
