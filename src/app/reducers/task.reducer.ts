import * as actions from '../actions/task.action';
import { Task } from '../domain/task.model';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';
import { createSelector } from 'reselect';
import { Project } from '../domain/project.model';
import { TaskList } from '../domain/task-list.model';


export interface State {
        ids:string[];
        entities:{[id: string]:Task};//字典格式
       
};

const initialState: State = {
        ids:[],
        entities:{},
};

const addTask=(state,action) => {
    const tasklist = action.payload;
    if(state.entities[tasklist.id]){//tasklist存在,返回原状态
        return state;
    }
    const newIds=[... state.ids,tasklist.id];//原来的ids展开，加入tasklist id后，形成新数组
    const newEntities={... state.entities,[tasklist.id]:tasklist};//字典对象打散，加入tasklistid对应的对象，重组
    return {ids:newIds, entities:newEntities,};//返回新state
}

const updateTask=(state,action) => {
        const tasklist=action.payload;
        const newEntities={... state.entities,[tasklist.id]:tasklist};//字典对象打散，加入tasklistid对应的对象，重组
        return {...state,entities:newEntities};//返回新state
    }
const deleteTask=(state,action) => {
    const tasklist=action.payload;
    const newIds=state.ids.filter(id => id !== tasklist.id);//刨除id
    const newEntities=newIds.reduce((entities,id:string) => ({... entities, [id]: state.entities[id]}),{});

    return {
        ids:newIds,
        entities:newEntities,
    };
    
    
}
const loadTask=(state,action) => {
    const tasks=action.payload;
    const incomingIds=tasks.map(p => p.id);
    const newIds= _.difference(incomingIds,state.ids);//跟原有id不相同的保留
    const incomingEntities=_.chain(tasks)
    .keyBy('id')//拿tasklist里面的id成为新成对象的key
    .mapValues(o => o)//这个对象本身当做value
    .value();//迭代，成为字典对象
    const newEntities=newIds.reduce((entities, id:string) => ({... entities, [id]:incomingEntities[id]}),{});
    return {
        ids:[...state.ids,...newIds],
        entities:{...state.entities,...newEntities},
    }; 
}

export function reducer(state = initialState, action: actions.Actions ): State {
    switch (action.type) {
        case actions.ADD_SUCCESS:
          return addTask(state, action);
        case actions.DELETE_SUCCESS:{
            return deleteTask(state, action);
        }
        // case actions.INVITE_SUCCESS:{
        //     return updateTask(state, action);
        // }
        case actions.UPDATE_SUCCESS:{
            return updateTask(state, action);
        }
       
        case actions.LOAD_SUCCESS:
          return loadTask(state, action);
        default:
          return state;
      }
}
export const getIds =(state:State) =>state.ids;
export const getEntities =(state:State) =>state.entities;

export const getAll =createSelector(getIds,getEntities,(ids,entities)=>{
    return ids.map(id => entities[id]);
})

