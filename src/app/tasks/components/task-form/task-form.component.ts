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
import { TaskPromiseService } from './../../services';

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
    private taskPromiseService: TaskPromiseService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.task = new TaskModel();

    this.tasksState$ = this.store.pipe(select('tasks'));
    this.sub = this.tasksState$.subscribe(
      tasksState => (this.task = tasksState.selectedTask)
    );

    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('taskID');
      if (id) {
        this.store.dispatch(TasksActions.getTask({ taskID: +id }));
      }
    });
  }

  onSaveTask() {
    const task = { ...this.task };

    const method = task.id ? 'updateTask' : 'createTask';
    this.taskPromiseService[method](task)
      .then(() => this.onGoBack())
      .catch(err => console.log(err));
  }

  onGoBack(): void {
    this.router.navigate(['/home']);
  }
}
