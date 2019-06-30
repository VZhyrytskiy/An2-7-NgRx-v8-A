import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

// @NgRx
import { Store, select } from '@ngrx/store';
import { AppState, TasksState } from './../../../core/@ngrx';
import * as TasksActions from './../../../core/@ngrx/tasks/tasks.actions';

// rxjs
import { Observable, Subscription } from 'rxjs';
import { AutoUnsubscribe } from './../../../core';

import { TaskModel } from './../../models/task.model';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
@AutoUnsubscribe()
export class TaskFormComponent implements OnInit {
  task: TaskModel;
  tasksState$: Observable<TasksState>;

  private sub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.tasksState$ = this.store.pipe(select('tasks'));
    this.sub = this.tasksState$.subscribe(tasksState => {
      if (tasksState.selectedTask) {
        this.task = { ...tasksState.selectedTask };
      } else {
        this.task = new TaskModel();
      }
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('taskID');
      if (id) {
        this.store.dispatch(TasksActions.getTask({ taskID: +id }));
      }
    });
  }

  onSaveTask() {
    const task = { ...this.task };

    if (task.id) {
      this.store.dispatch(TasksActions.updateTask(task));
    } else {
      this.store.dispatch(TasksActions.createTask(task));
    }
  }

  onGoBack(): void {
    this.router.navigate(['/home']);
  }
}
