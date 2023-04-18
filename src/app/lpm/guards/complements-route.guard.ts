import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, firstValueFrom, map, of, tap } from 'rxjs';
import { LpmService } from '../services/lpm.service';
import { AdminService } from 'src/app/admin/services/admin.service';

@Injectable({
  providedIn: 'root',
})
export class ComplementsRouteGuard {
  constructor(
    private lpmService: LpmService,
    private router: Router,
    private adminService: AdminService
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<any | boolean> {
    const section = route.params?.['section'];
    const title = route.params?.['title'];

    let sections: any[] = await this.adminService.getSectionsAvailable();
    const [...sectionsNames] = new Set(sections);

    const titles = await firstValueFrom(
      this.lpmService
        .getSectionAll()
        .pipe(map((informacion) => informacion.map((result) => result.titulo)))
    );

    this.lpmService.getSectionAll().subscribe;
    if (sectionsNames.includes(section) && titles.includes(title)) {
      return true;
    } else {
      console.log(false);
      this.router.navigateByUrl('lpm/principal/valores');
      return false;
    }
  }
}
