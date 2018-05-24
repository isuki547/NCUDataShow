import { Action } from '@ngrx/store';
import { Auth } from '../domain/auth.model';
import { User } from '../domain/user.model';
import { Err } from '../domain/err.model';
import { TaskList } from '../domain/task-list.model';

export const ADD = '[TaskList] Add';
export const ADD_SUCCESS = '[TaskList] add Success';
export const ADD_FAIL = '[TaskList] add Fail';
export const UPDATE = '[TaskList] update';
export const UPDATE_SUCCESS = '[TaskList] update Success';
export const UPDATE_FAIL = '[TaskList] update Fail';
export const DELETE = '[TaskList] delete';
export const DELETE_SUCCESS = '[TaskList] delete success';
export const DELETE_FAIL = '[TaskList] delete fail';
export const LOAD = '[TaskList] load';
export const LOAD_SUCCESS = '[TaskList] load success';
export const LOAD_FAIL = '[TaskList] load fail';
export const SWAP = '[TaskList] SWAP';
export const SWAP_SUCCESS = '[TaskList] SWAP success';
export const SWAP_FAIL = '[TaskList] SWAP fail';




export class AddAction implements Action {
    readonly type = ADD;

    constructor(public payload: TaskList) {
    }
}

export class AddSuccessAction implements Action {
    readonly type = ADD_SUCCESS;

    constructor(public payload: TaskList) {
    }
}

export class AddFailAction implements Action {
    readonly type = ADD_FAIL;

    constructor(public payload: Err) {
    }
}

export class UpdateAction implements Action {
    readonly type = UPDATE;

    constructor(public payload: TaskList) {
    }
}

export class UpdateSuccessAction implements Action {
    readonly type = UPDATE_SUCCESS;

    constructor(public payload: TaskList) {
    }
}

export class UpdateFailAction implements Action {
    readonly type = UPDATE_FAIL;

    constructor(public payload: Err) {
    }
}

export class DeleteAction implements Action {
    readonly type = DELETE;

    constructor(public payload:TaskList) {
    }
}

export class DeleteSuccessAction implements Action {
    readonly type = DELETE_SUCCESS;

    constructor(public payload:TaskList) {
    }
}

export class DeleteFailAction implements Action {
    readonly type = DELETE_FAIL;

    constructor(public payload: Err) {
    }
}

export class LoadAction implements Action {
    readonly type = LOAD;

    constructor(public payload:string) {
    }
}

export class LoadSuccessAction implements Action {
    readonly type = LOAD_SUCCESS;

    constructor(public payload: TaskList[]) {
    }
}

export class LoadFailAction implements Action {
    readonly type = LOAD_FAIL;

    constructor(public payload: Err) {
    }
}
export class SwapAction implements Action {
    readonly type = SWAP;

    constructor(public payload: {src: TaskList; target:TaskList}) {
    }
}

export class SwapSuccessAction implements Action {
    readonly type = SWAP_SUCCESS;

    constructor(public payload: TaskList[]) {
    }
}

export class SwapFailAction implements Action {
    readonly type = SWAP_FAIL;

    constructor(public payload: Err) {
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
    | SwapAction
    | SwapSuccessAction
    | SwapFailAction
    
    
    ;