import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// @Ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { TasksStoreModule } from './tasks/tasks-store.module';
import { metaReducers } from './meta-reducers';
import { routerReducers, CustomSerializer } from './router';
import { environment } from './../../../environments/environment';
import { UsersStoreModule } from './users/users-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(routerReducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        // router state is not serializable
        // set false if you don't use CustomSerializer
        strictStateSerializability: true,
        // router action is not serializable
        // set false
        strictActionSerializability: true
      }
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal,
      serializer: CustomSerializer
    }),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    TasksStoreModule,
    UsersStoreModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ]
})
export class RootStoreModule {}
