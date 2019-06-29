import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// @NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { tasksReducer } from './../core/@ngrx';
import { TasksEffects } from '../core/@ngrx/tasks/tasks.effects';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskComponent, TaskFormComponent, TaskListComponent } from './components';
import { TasksServicesModule } from './tasks-services.module';

@NgModule({
  declarations: [TaskListComponent, TaskFormComponent, TaskComponent],
  imports: [CommonModule, FormsModule,
    StoreModule.forFeature('tasks', tasksReducer),
    TasksRoutingModule, TasksServicesModule, EffectsModule.forFeature([TasksEffects])],
  providers: []
})
export class TasksModule {}
