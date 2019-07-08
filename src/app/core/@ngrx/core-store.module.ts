import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// @Ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { metaReducers } from './meta-reducers';
import { routerReducers, CustomSerializer, RouterEffects } from './router';
import { environment } from './../../../environments/environment';

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
        strictActionSerializability: false
      }
    }),
    EffectsModule.forRoot([RouterEffects]),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    }),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ]
})
export class CoreStoreModule {}
