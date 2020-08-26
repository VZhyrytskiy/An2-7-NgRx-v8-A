import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';

// rxjs
import { Observable, of } from 'rxjs';
import { delay, map, catchError, finalize, tap, take } from 'rxjs/operators';

// NgRx
import { Store, select } from '@ngrx/store';
import { selectSelectedUserByUrl } from './../../core/@ngrx';
import * as UsersActions from './../../core/@ngrx/users/users.actions';

import { UserModel } from './../models/user.model';
import { SpinnerService } from './../../widgets';

@Injectable({
  providedIn: 'any'
})
export class UserResolveGuard implements Resolve<UserModel> {
  constructor(
    private store: Store,
    private router: Router,
    private spinner: SpinnerService
  ) {}

  resolve(): Observable<UserModel> | null {
    console.log('UserResolve Guard is called');
    this.spinner.show();

    return this.store.pipe(
      select(selectSelectedUserByUrl),
      tap(user => this.store.dispatch(UsersActions.setOriginalUser({ user }))),
      delay(2000),
      map((user: UserModel) => {
        if (user) {
          return user;
        } else {
          this.router.navigate(['/users']);
          return null;
        }
      }),
      take(1),
      catchError(() => {
        this.router.navigate(['/users']);
        // catchError MUST return observable
        return of(null);
      }),
      finalize(() => this.spinner.hide())
    );
  }
}
