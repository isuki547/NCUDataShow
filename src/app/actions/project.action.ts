import { Action } from '@ngrx/store';
import { Auth } from '../domain/auth.model';
import { User } from '../domain/user.model';
import { Err } from '../domain/err.model';
import { Project } from '../domain/index';

export const ADD = '[Project] Add';
export const ADD_SUCCESS = '[Project] add Success';
export const ADD_FAIL = '[Project] add Fail';
export const UPDATE = '[Project] update';
export const UPDATE_SUCCESS = '[Project] update Success';
export const UPDATE_FAIL = '[Project] update Fail';
export const DELETE = '[Project] delete';
export const DELETE_SUCCESS = '[Project] delete success';
export const DELETE_FAIL = '[Project] delete fail';
export const LOAD = '[Project] load';
export const LOAD_SUCCESS = '[Project] load success';
export const LOAD_FAIL = '[Project] load fail';
export const INVITE = '[Project] invite';
export const INVITE_SUCCESS = '[Project] invite success';
export const INVITE_FAIL = '[Project] invite fail';
export const SELECT_PROJECT = '[Project] select project';




export class AddAction implements Action {
    readonly type = ADD;

    constructor(public payload: Project) {
    }
}

export class AddSuccessAction implements Action {
    readonly type = ADD_SUCCESS;

    constructor(public payload: Project) {
    }
}

export class AddFailAction implements Action {
    readonly type = ADD_FAIL;

    constructor(public payload: Err) {
    }
}

export class UpdateAction implements Action {
    readonly type = UPDATE;

    constructor(public payload: Project) {
    }
}

export class UpdateSuccessAction implements Action {
    readonly type = UPDATE_SUCCESS;

    constructor(public payload: Project) {
    }
}

export class UpdateFailAction implements Action {
    readonly type = UPDATE_FAIL;

    constructor(public payload: Err) {
    }
}

export class DeleteAction implements Action {
    readonly type = DELETE;

    constructor(public payload:Project) {
    }
}

export class DeleteSuccessAction implements Action {
    readonly type = DELETE_SUCCESS;

    constructor(public payload:Project) {
    }
}

export class DeleteFailAction implements Action {
    readonly type = DELETE_FAIL;

    constructor(public payload: Err) {
    }
}

export class LoadAction implements Action {
    readonly type = LOAD;

    constructor(public payload:null) {
    }
}

export class LoadSuccessAction implements Action {
    readonly type = LOAD_SUCCESS;

    constructor(public payload: Project[]) {
    }
}

export class LoadFailAction implements Action {
    readonly type = LOAD_FAIL;

    constructor(public payload: Err) {
    }
}
export class InviteAction implements Action {
    readonly type = INVITE;

    constructor(public payload: {projectId: string; members:User[]}) {
    }
}

export class InviteSuccessAction implements Action {
    readonly type = INVITE_SUCCESS;

    constructor(public payload: Project) {
    }
}

export class InviteFailAction implements Action {
    readonly type = INVITE_FAIL;

    constructor(public payload: Err) {
    }
}
export class SelectAction implements Action {
    readonly type = SELECT_PROJECT;
  
    constructor(public payload: Project) {
    }
  }

export type Actions
    = AddAction
    | AddSuccessAction
    | AddFailAction
    | UpdateAction
    | UpdateSuccessAction
    | UpdateFailAction
    | DeleteAction
    | DeleteSuccessAction
    | DeleteFailAction
    | LoadAction
    | LoadSuccessAction
    | LoadFailAction
    | SelectAction
    | InviteAction
    ;