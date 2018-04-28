import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StoreModule, ActionReducer, combineReducers, Action } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from "ngrx-store-freeze";
import { compose } from '@ngrx/store';
import * as fromQuote from './quotes.reducer';
import * as fromAuth  from "./auth.reducer";
import * as fromProject  from "./project.reducer";
import { ActionReducerMap ,createFeatureSelector} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { createSelector } from "reselect";
import { Quote, Project,Auth } from '../domain/index';

export interface State {
         quote:Quote;//quote reducer里面的state
         auth:Auth;
         project: fromProject.State;
};

export const reducers: ActionReducerMap<State> = {
    quote:fromQuote.reducer,
    auth:fromAuth.reducer,
    project:fromProject.reducer
  };


//取全局state

  
export const getAuthState = createFeatureSelector<Auth>('auth');
export const getQuoteState = createFeatureSelector<Quote>('quote');
export const getProjectsState = createFeatureSelector<fromProject.State>('project');


export const getProjects = createSelector(getProjectsState, fromProject.getAll);

  @NgModule({
    imports: [
        BrowserModule,
        StoreModule.forRoot(reducers),
        StoreRouterConnectingModule,
        !environment.production
        ? StoreDevtoolsModule.instrument()
        : [],
       
    ]
})
export class AppStoreModule {}