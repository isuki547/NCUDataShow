import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';
import {QuoteService} from '../service/quotes.service';
import * as actions from '../actions/quotes.action';

@Injectable()
export class QuoteEffects {
  /**
   *
   */
  @Effect()
  quote$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.QuoteAction>(actions.QUOTE),
      switchMap(() => this.quoteService.getQuote()
        .pipe(
          map(quote => new actions.QuoteSuccessAction(quote)),
           // 如果成功发出 QuoteSuccessAction 交给其它 Effect 或者 Reducer 去处理
          catchError(err => of(new actions.QuoteFailAction(JSON.stringify(err))))
          // 如果发出 QuoteFailAction 打印错误信息

        )
      )
    );

  /**
   *
   * @param actions$
   * @param quoteService
   */
  constructor(private actions$: Actions, private quoteService: QuoteService) {}
}
