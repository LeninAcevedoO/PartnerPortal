import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ContextService } from "src/app/services/services/context.service";
import { environment } from "src/environments/environment";

export const authGuard: CanActivateFn = (route, state) => {
  const _context = inject(ContextService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  // if (!environment.production)
  //   return true;
  // else {
  //   if (_context.isAuth())
  //     return true;
  //   else {
  //     router.navigate(['/login'])
  //     return false;
  //   }
  // }

  if (_context.isAuth())
    return true;
  else {
    toastr.warning('You need to login', 'Login needed');
    router.navigate(["/login"]);
    return false;
  }
};
