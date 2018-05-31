import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {map, switchMap, catchError, tap} from 'rxjs/operators';
import {AuthService} from '../service/auth.service';
import * as actions from '../actions/auth.action';
import * as routerActions from '../actions/router.action';

@Injectable()
export class AuthEffects {
  
  @Effect()
  //用 @Effect() 修饰器来标明这是一个 Effect
  login$: Observable<Action> = this.actions$// action 信号流
    .pipe(
      ofType<actions.LoginAction>(actions.LOGIN),
      // 如果是 LOGIN Action
      map((action: actions.LoginAction) => action.payload),
      // 转换成 action 的 payload 数据流
      // 调用服务
      switchMap((val: { email: string, password: string }) => this.authService
        .login(val.email, val.password)
        //输入账号密码
        .pipe(
          map(auth => new actions.LoginSuccessAction(auth)),
           // 如果成功发出 LoginSuccessAction 交给其它 Effect 或者 Reducer 去处理
          catchError(err => of(new actions.LoginFailAction({
             // 如果失败发出 LoginFail Action 交给其它 Effect 或者 Reducer 去处理
            //  返回登录页面
            status: 501,
            message: err.message,
            exception: err.stack,
            path: '/project',
            timestamp: new Date()
          })))
          
        )
      )
    );

  /**
   *
   */
  @Effect()
  register$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.RegisterAction>(actions.REGISTER),
      map(action => action.payload),
      switchMap((val) => this.authService.register(val)
        .pipe(
          map(auth => new actions.RegisterSuccessAction(auth)),
          catchError(err => of(new actions.RegisterFailAction(err)))
        )
      )
    );

  @Effect()
  navigateHome$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.LoginSuccessAction>(actions.LOGIN_SUCCESS),
      map(() => new routerActions.Go({path: ['/project']}))
    );

  @Effect()
  registerAndHome$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.RegisterSuccessAction>(actions.REGISTER_SUCCESS),
      map(() => new routerActions.Go({path: ['/project']}))
    );

  @Effect()
  logout$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.LogoutAction>(actions.LOGOUT),
      map(() => new routerActions.Go({path: ['/']}))
    );

  @Effect({ dispatch: false })
  navigate$ = this.actions$
    .pipe(
      ofType(routerActions.GO),
      map((action: routerActions.Go) => action.payload),
      tap(({ path, query: queryParams, extras}) =>
        this.router.navigate(path, { queryParams, ...extras }))
    );

  /**
   *
   * @param actions$
   * @param authService
   */
  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService) {}
}
