import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { selectUsersLoaded } from './../../core/@ngrx';
import * as UsersActions from './../../core/@ngrx/users/users.actions';

import { Observable, of } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'any'
})
export class UsersStatePreloadingGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private checkStore(): Observable<boolean> {
    return this.store.pipe(
      select(selectUsersLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(UsersActions.getUsers());
        }
      }),
      take(1)
    );
  }
}
