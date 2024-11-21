import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { routingGuardGuard } from './routing-guard.guard';

describe('routingGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => routingGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
