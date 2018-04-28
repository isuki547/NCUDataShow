import * as quoteAction from '../actions/quotes.action';
import { Quote } from '../domain/quote.model';
import { Action } from '@ngrx/store';
import * as actions from "../actions/quotes.action";
import { ActionReducerMap } from '@ngrx/store';


export interface State {
    quote: Quote;
};

export const initialState: Quote = {

        "cn":"第一个愿望是，佛一直可以在我心里，帮助我别离开我，来生还可以做人。——《极地》",
        "en":"The first wish is that the Buddha can always be in my heart and help me not to leave me,can still be a person next life. ",
        "pic":"/assets/img/quotes/2.jpg",
      
};

export function reducer(state: Quote = initialState, action: actions.Actions): Quote {
    switch (action.type) {
      case actions.QUOTE_SUCCESS:
        return {...action.payload};
      case actions.QUOTE_FAIL:
      default:
        return state;
    }
  }
  // export const getQuote = (state: State) => state.quote; 
