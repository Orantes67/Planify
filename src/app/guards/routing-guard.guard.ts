import { CanActivateFn } from '@angular/router';

export const routingGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
