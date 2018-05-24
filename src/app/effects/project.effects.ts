import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { withLatestFrom, map, switchMap, catchError, tap } from 'rxjs/operators';
import { ProjectService } from "../service/project.service";
import { AuthService } from '../service/auth.service';
import * as actions from '../actions/project.action';
import * as tasklistactions from '../actions/task-list.action';
import * as routerActions from '../actions/router.action';
import * as fromRoot from '../reducers';
import { getAuthState } from '../reducers/index';
import { LoadAction } from '../actions/task-list.action';




@Injectable()
export class ProjectEffects {

    /**
     *
     */
    @Effect()
    // 加载项目列表
    loadProjects$: Observable<Action> = this.actions$
        .pipe(
        ofType<actions.LoadAction>(actions.LOAD),
        withLatestFrom(this.store$.pipe(select(fromRoot.getAuthState))),
        // 获取当前登录用户
        switchMap(([_, auth]) => this.service$.get(auth.userId)
        // 获取用户id
            .pipe(
            map(project => new actions.LoadSuccessAction(project)),
              // 如果成功发出 LoadSuccessAction 交给其它 Effect 或者 Reducer 去处理
            catchError(err => of(new actions.LoadFailAction(err)))
              // 如果发出 LoadFailAction 交给其它 Effect 或者 Reducer 去处理
            )
        )
        );

    @Effect()
    addProjects$: Observable<Action> = this.actions$
        .pipe(
        ofType<actions.AddAction>(actions.ADD),
        map(action => action.payload),
        withLatestFrom(this.store$.pipe(select(fromRoot.getAuthState))),
        switchMap(([project, auth]) => {
            const added = { ...project, members: [`${auth.userId}`] };
            return this.service$.add(added)
                .pipe(
                map(project => new actions.AddSuccessAction(project)),
                catchError(err => of(new actions.AddFailAction(err)))
                );
        })
        );

    @Effect()
    updateProject$: Observable<Action> = this.actions$
        .pipe(
        ofType<actions.UpdateAction>(actions.UPDATE),
        map(action => action.payload),
        switchMap(project => this.service$.update(project)
            .pipe(
            map(project => new actions.UpdateSuccessAction(project)),
            catchError(err => of(new actions.UpdateFailAction(err)))
            )
        )
        );
    @Effect()
    deleteProject$: Observable<Action> = this.actions$
        .pipe(
        ofType<actions.DeleteAction>(actions.DELETE),
        map(action => action.payload),
        switchMap(project => this.service$.del(project)
            .pipe(
            map(project => new actions.DeleteSuccessAction(project)),
            catchError(err => of(new actions.DeleteFailAction(err)))
            )
        )
        );

    @Effect()
    selectProject$: Observable<Action> = this.actions$
        .pipe(
        ofType<actions.SelectAction>(actions.SELECT_PROJECT),
        map(action => action.payload),
        map(project => new routerActions.Go({ path: [`/list${project.id}`] }))
        // map(project => new routerActions.Go({ path: [`/project-detail`] }))
        
        );
    @Effect()
    loadTaskLists$: Observable<Action> = this.actions$
        .pipe(
        ofType<actions.SelectAction>(actions.SELECT_PROJECT),
        map(action => action.payload),
        map(project => new tasklistactions.LoadAction(<string>project.id))
        );

    @Effect()
    invite$: Observable<Action> = this.actions$
        .pipe(
        ofType<actions.InviteAction>(actions.INVITE),
        map(action => action.payload),
        switchMap(({projectId,members }) => this.service$.invite(projectId,members)
            .pipe(
            map(project => new actions.InviteSuccessAction(project)),
            catchError(err => of(new actions.InviteFailAction(err)))
            )
        )
        );

    /**
     *
     * @param actions$ action 流
     * @param service  注入 ProjectService
     * @param store$ 注入 redux store
     */
    constructor(private actions$: Actions,
        private service$: ProjectService,
        private router: Router,
        private store$: Store<fromRoot.State>) { }
}
