import { CanActivateFn } from '@angular/router';

export const exampleGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
