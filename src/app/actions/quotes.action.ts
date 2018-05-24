import {Action} from '@ngrx/store';
import { Quote} from '../domain';

export const QUOTE = '[Quote] Quote';
export const QUOTE_SUCCESS = '[Quote] Quote Success';
export const QUOTE_FAIL = '[Quote] Quote Fail';

export class QuoteAction implements Action {
  readonly type = QUOTE;
}
// 读取名言成功action
export class QuoteSuccessAction implements Action {
  readonly type = QUOTE_SUCCESS;
  constructor(public payload: Quote) {
  }
}
// 读取名言失败action
export class QuoteFailAction implements Action {
  readonly type = QUOTE_FAIL;
  constructor(public payload: string) {
  }
}
// 导出3种action
export type Actions
  = QuoteAction
  | QuoteSuccessAction
  | QuoteFailAction;
