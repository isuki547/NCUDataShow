import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';
import { from } from 'rxjs/observable/from';
import { TaskListService } from '../service/task-list.service';
import { Task, TaskList } from '../domain';
import * as actions from '../actions/task-list.action';
import * as prjactions from '../actions/project.action';
import * as tasklistactions from '../actions/task-list.action';
import * as fromRoot from '../reducers';

@Injectable()
export class TaskListEffects {
  /**
   *
   */
  @Effect()
  loadTaskLists$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.LoadAction>(actions.LOAD),
      map(action => action.payload),
      switchMap((projectId) => this.service$.get(projectId)
        .pipe(
          map(taskLists => new actions.LoadSuccessAction(taskLists)),
          catchError(err => of(new actions.LoadFailAction(err)))
        )
      )
    );

  @Effect()
  addTaskList$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.AddAction>(actions.ADD),
      map(action => action.payload),
      switchMap((taskList) => this.service$.add(taskList)//从service调用函数
        .pipe(//回传action
          map(tl => new actions.AddSuccessAction(tl)),
          catchError(err => of(new actions.AddFailAction(err)))
        )
      )
    );

  @Effect()
  updateTaskList$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.UpdateAction>(actions.UPDATE),
      map(action => action.payload),
      switchMap(taskList => this.service$.update(taskList)
        .pipe(
          map(tl => new actions.UpdateSuccessAction(tl)),
          catchError(err => of(new actions.UpdateFailAction(err)))
        )
      )
    );

  @Effect()
  deleteTaskList$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.DeleteAction>(actions.DELETE),
      map(action => action.payload),
      switchMap(taskList => this.service$.del(taskList)
        .pipe(
          map(tl => new actions.DeleteSuccessAction(tl)),
          catchError(err => of(new actions.DeleteFailAction(err)))
        )
      )
    );
    @Effect()
    swap$: Observable<Action> = this.actions$
      .pipe(
        ofType<actions.SwapAction>(actions.SWAP),
        map(action => action.payload),
        switchMap(({ src, target }) =>
          this.service$.swapOrder(src, target)
            .pipe(
              map(tls => new actions.SwapSuccessAction(tls)),
              catchError(err => of(new actions.SwapFailAction(err)))
            )
        )
      );

  /**
   * 任务列表的 Effects
   * @param actions$ 注入 action 数据流
   * @param service$ 注入任务列表服务
   * @param store$ 注入 redux store
   */
  constructor(private actions$: Actions,
    private service$: TaskListService,
    private store$: Store<fromRoot.State>) {
  }
}
