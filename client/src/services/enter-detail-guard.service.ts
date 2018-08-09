import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable }  from '@angular/core';
import { map } from 'rxjs/operators';
import { SessionService } from './session';
import { Observable } from 'rxjs';

@Injectable()
export class EnterDetailGuardService implements CanActivate {
  constructor(public sessionService: SessionService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): Observable<boolean> {
    return this.sessionService.isLogged().pipe(
      map(user => {
        if (user) return true;
        else return false;
      })
    );
  }
}