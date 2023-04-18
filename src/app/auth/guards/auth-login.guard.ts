import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanLoad,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, catchError, of, tap } from 'rxjs';
import { UserService } from '../services/user.service';
import { SwalFireService } from 'src/app/admin/services/swal-fire.service';

@Injectable({
  providedIn: 'root',
})
/* guard restringe acceso por token no verificado y si no cumple el rol de administrador */
export class AuthLoginGuard {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.userService.verifyTokenForAccess().pipe(
      tap((valid) => {
        if (!valid) {
          this.router.navigateByUrl('/auth/login');
        }
      })
    );
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    return this.userService.verifyTokenForAccess().pipe(
      tap((valid) => {
        if (!valid) {
          this.swalService
            .errorMessage(this.userService.errorAuthorization)
            .then(() => {
              this.router.navigateByUrl('/auth/login');
            });
        }
      })
    );
  }

  get statusActiveUser(): boolean {
    return this.userService.user.isActive ?? false;
  }
  constructor(
    private userService: UserService,
    private router: Router,
    private swalService: SwalFireService
  ) {}
}
