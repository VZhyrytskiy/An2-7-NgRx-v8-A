import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersServicesModule } from './users-services.module';

import { UserComponent } from './components';
import { UsersAPIProvider } from './users.config';

// @NgRx
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UsersEffects, usersReducer } from './../core/@ngrx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    UsersServicesModule,
    StoreModule.forFeature('users', usersReducer),
    EffectsModule.forFeature([UsersEffects])
  ],
  providers: [UsersAPIProvider],
  declarations: [UsersRoutingModule.components, UserComponent]
})
export class UsersModule {}
