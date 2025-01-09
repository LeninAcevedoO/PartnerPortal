import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ContextService } from 'src/app/services/services/context.service';
import { environment } from 'src/environments/environment';

export const adminGuard: CanActivateFn = (route, state) => {
  const _context = inject(ContextService);
    const router = inject(Router);
  
    if (!environment.production)
      return true;
    else {
      if (_context.isAuth() && [1,2].includes(_context.theRol())) 
        return true;
      else {
        router.navigate(['/login'])
        return false;
      }
    }
};
