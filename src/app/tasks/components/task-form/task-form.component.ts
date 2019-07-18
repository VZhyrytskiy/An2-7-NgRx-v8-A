import { Component, OnInit } from '@angular/core';

// @NgRx
import { TasksFacade } from 'src/app/core/@ngrx/tasks/tasks.facade';

// rxjs
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from './../../../core';

import { TaskModel, Task } from './../../models/task.model';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
@AutoUnsubscribe()
export class TaskFormComponent implements OnInit {
  task: TaskModel;

  private sub: Subscription;

  constructor(private tasksFacade: TasksFacade) {}

  ngOnInit(): void {
    this.sub = this.tasksFacade.selectedTaskByUrl$.subscribe(
      task => (this.task = { ...task })
    );
  }

  onSaveTask() {
    const task = { ...this.task } as Task;

    const method = task.id ? 'updateTask' : 'createTask';
    this.tasksFacade[method]({ task });
    this.onGoBack();
  }

  onGoBack(): void {
    this.tasksFacade.goTo({ path: ['/home'] });
  }
}
