import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// @Ngrx
import { StoreModule } from '@ngrx/store';
import { TasksStoreModule } from './tasks/tasks-store.module';
import { metaReducers } from './meta-reducers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers,
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true
        }
      }
    ),
    TasksStoreModule
  ]
})
export class RootStoreModule {}
