import {Action} from '@ngrx/store';
import {Auth} from '../domain/auth.model'; 
import {User} from '../domain/user.model'; 
import {Err} from '../domain/err.model'; 

export const LOGIN = '[Auth] Login';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const REGISTER = '[Auth] Register';
export const REGISTER_SUCCESS = '[Auth] Register Success';
export const REGISTER_FAIL = '[Auth] Register Fail';
export const LOGOUT = '[Auth] Logout';

export class LoginAction implements Action {
  readonly type = LOGIN;
  constructor(public payload: { email: string; password: string }) {
    // 准备发送的数据
  }
}
// 对登录action设置不同状态
export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: Auth) {
    // 返回一个auth对象
  }
}
export class LoginFailAction implements Action {
  readonly type = LOGIN_FAIL;
  constructor(public payload: Err) {
    // 返回错误信息
  }
}

export class RegisterAction implements Action {
  readonly type = REGISTER;

  constructor(public payload: User) {
  }
}

export class RegisterSuccessAction implements Action {
  readonly type = REGISTER_SUCCESS;

  constructor(public payload: Auth) {
  }
}

export class RegisterFailAction implements Action {
  readonly type = REGISTER_FAIL;

  constructor(public payload: Err) {
  }
}

export class LogoutAction implements Action {
  readonly type = LOGOUT;

  constructor() {
  }
}

export type Actions
  = LoginAction
  | LoginSuccessAction
  | LoginFailAction
  | RegisterAction
  | RegisterSuccessAction
  | RegisterFailAction
  | LogoutAction;
