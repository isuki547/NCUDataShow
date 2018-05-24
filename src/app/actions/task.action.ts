import { Action } from '@ngrx/store';
import { Auth } from '../domain/auth.model';
import { User } from '../domain/user.model';
import { Err } from '../domain/err.model';
import { Task } from '../domain/task.model';
import { TaskList } from '../domain/index';

export const ADD = '[Task] Add';
export const ADD_SUCCESS = '[Task] add Success';
export const ADD_FAIL = '[Task] add Fail';
export const UPDATE = '[Task] update';
export const UPDATE_SUCCESS = '[Task] update Success';
export const UPDATE_FAIL = '[Task] update Fail';
export const DELETE = '[Task] delete';
export const DELETE_SUCCESS = '[Task] delete success';
export const DELETE_FAIL = '[Task] delete fail';
export const LOAD = '[Task] load';
export const LOAD_SUCCESS = '[Task] load success';
export const LOAD_FAIL = '[Task] load fail';
export const MOVE = '[Task] MOVE';
export const MOVE_SUCCESS = '[Task] MOVE success';
export const MOVE_FAIL = '[Task] MOVE fail';

export const MOVE_ALL = '[Task] MOVE ALL';
export const MOVE_ALL_SUCCESS = '[Task] MOVE ALL success';
export const MOVE_ALL_FAIL = '[Task] MOVE ALL fail';

export const COMPLETE_ALL = '[Task] COMPLETE ALL';
export const COMPLETE_SUCCESS = '[Task] COMPLETE  success';
export const COMPLETE_FAIL = '[Task] COMPLETE fail';



export class AddAction implements Action {
    readonly type = ADD;

    constructor(public payload: Task) {
    }
}

export class AddSuccessAction implements Action {
    readonly type = ADD_SUCCESS;

    constructor(public payload: Task) {
    }
}

export class AddFailAction implements Action {
    readonly type = ADD_FAIL;

    constructor(public payload: Err) {
    }
}

export class UpdateAction implements Action {
    readonly type = UPDATE;

    constructor(public payload: Task) {
    }
}

export class UpdateSuccessAction implements Action {
    readonly type = UPDATE_SUCCESS;

    constructor(public payload: Task) {
    }
}

export class UpdateFailAction implements Action {
    readonly type = UPDATE_FAIL;

    constructor(public payload: Err) {
    }
}

export class DeleteAction implements Action {
    readonly type = DELETE;

    constructor(public payload:Task) {
    }
}

export class DeleteSuccessAction implements Action {
    readonly type = DELETE_SUCCESS;

    constructor(public payload:Task) {
    }
}

export class DeleteFailAction implements Action {
    readonly type = DELETE_FAIL;

    constructor(public payload: Err) {
    }
}

export class LoadAction implements Action {
    readonly type = LOAD;

    constructor(public payload:TaskList[]) {
    }
}

export class LoadSuccessAction implements Action {
    readonly type = LOAD_SUCCESS;

    constructor(public payload: Task[]) {
    }
}

export class LoadFailAction implements Action {
    readonly type = LOAD_FAIL;

    constructor(public payload: Err) {
    }
}
export class MoveAction implements Action {
    readonly type = MOVE;

    constructor(public payload: {taskId: string; taskListId:string}) {
    }
}

export class MoveSuccessAction implements Action {
    readonly type = MOVE_SUCCESS;

    constructor(public payload: Task[]) {
    }
}

export class MoveFailAction implements Action {
    readonly type = MOVE_FAIL;

    constructor(public payload: Err) {
    }
}
export class MoveAllAction implements Action {
    readonly type = MOVE_ALL;

    constructor(public payload: {srcListId: string; targetListId:string }) {
    }
}

export class MoveAllSuccessAction implements Action {
    readonly type = MOVE_ALL_SUCCESS;

    constructor(public payload: Task[]) {
    }
}

export class MoveAllFailAction implements Action {
    readonly type = MOVE_ALL_FAIL;

    constructor(public payload: Err) {
    }
}
export class CompleteAllAction implements Action {
    readonly type = COMPLETE_ALL;

    constructor(public payload: Task) {
    }
}

export class CompleteSuccessAction implements Action {
    readonly type = COMPLETE_SUCCESS;

    constructor(public payload: Task) {
    }
}

export class CompleteFailAction implements Action {
    readonly type = COMPLETE_FAIL;

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
    | MoveAction
    | MoveSuccessAction
    | MoveFailAction
    | MoveAllAction
    | MoveAllSuccessAction
    | MoveAllFailAction
    | CompleteAllAction
    | CompleteSuccessAction
    | CompleteFailAction
    
    ;