import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthLoginGuard {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.userService.verifyTokenForAccess().pipe(
      tap((valid) => {
        if (!valid) {
          /* falta controlar el mensaje que se envía acá y a donde redirige  */
          console.log('usuario inválido');
          this.router.navigateByUrl('./');
        }
      })
    );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.verifyTokenForAccess().pipe(
      tap((valid) => {
        if (!valid) {
          console.log(valid);
        }
      })
    );
  }

  get statusActiveUser(): boolean {
    return this.userService.user.isActive ?? false;
  }
  constructor(private userService: UserService, private router: Router) {}
}
