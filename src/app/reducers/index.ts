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
import * as fromTaskList  from "./task-list.reducer";
import * as fromUsers from './user.reducer';


import { ActionReducerMap ,createFeatureSelector} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { createSelector } from "reselect";
import { Quote, Project,Auth } from '../domain/index';

export interface State {
         quote:Quote;//quote reducer里面的state
         auth:Auth;
         project: fromProject.State;
         tasklists: fromTaskList.State;
         users: fromUsers.State;
};

export const reducers: ActionReducerMap<State> = {
    quote:fromQuote.reducer,
    auth:fromAuth.reducer,
    project:fromProject.reducer,
    tasklists:fromTaskList.reducer,
    users: fromUsers.reducer,

  };


//取全局state

  
export const getAuthState = createFeatureSelector<Auth>('auth');
export const getQuoteState = createFeatureSelector<Quote>('quote');
export const getProjectsState = createFeatureSelector<fromProject.State>('project');
// export const getTaskListsState = createFeatureSelector<fromTaskList.State>('taskLists');
export const getUserState = (state: State) => state.users;

const getProjectEntities = createSelector(getProjectsState, fromProject.getEntities);
const getUserEntities = createSelector(getUserState, fromUsers.getEntities);


export const getProjectMembers = (projectId: string) => createSelector(getProjectsState, getUserEntities, (state, entities) => {
  return state.entities[projectId].members.map(id => entities[id]);
});
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
export class AppStoreModule { }