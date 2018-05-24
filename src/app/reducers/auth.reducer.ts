import {Auth} from '../domain/auth.model';
import * as actions from '../actions/auth.action';

export const initialState: Auth = {
  
};
export interface State {
  auth : Auth;
};

export function reducer(state: Auth = initialState, action: actions.Actions): Auth {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
    case actions.REGISTER_SUCCESS: {
      // 对于登录和注册成功的状态
      const auth = <Auth>action.payload;
      return {
        // 返回更新的payload,返回用户数据
        token: auth.token,
        userId: auth.user ? auth.user.id : undefined
      };
    }
    case actions.LOGIN_FAIL:
    case actions.REGISTER_FAIL: {
      // 对于登录和注册失败的情况，返回错误信息
      return {err: <string>action.payload};
    }
    default: {
      return state;
    }
  }
}
