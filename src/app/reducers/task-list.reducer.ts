import * as actions from '../actions/task-list.action';
import * as prjactions from '../actions/project.action';
import * as _ from 'lodash';
import { map, filter } from 'rxjs/operators';
import { createSelector } from 'reselect';
import { TaskList } from '../domain/task-list.model';
import { Project } from '../domain/project.model';


export interface State {
        ids:string[];
        entities:{[id: string]:TaskList};//字典格式
        selectedIds:string[]; //选择项目的号码
};

const initialState: State = {
        ids:[],
        entities:{},
        selectedIds:[],
};

const addTasklist=(state,action) => {
    const tasklist = action.payload;
    if(state.entities[tasklist.id]){//tasklist存在,返回原状态
        return state;
    }
    const newIds=[... state.ids,tasklist.id];//原来的ids展开，加入tasklist id后，形成新数组
    const newEntities={... state.entities,[tasklist.id]:tasklist};//字典对象打散，加入tasklistid对应的对象，重组
    const newSelectedIds =[... state.selectedIds, tasklist.id];
    return {ids:newIds, entities:newEntities, selectedIds:newSelectedIds};//返回新state
}

const updateTasklist=(state,action) => {
    const tasklist=action.payload;
    const newEntities={... state.entities,[tasklist.id]:tasklist};//字典对象打散，加入tasklistid对应的对象，重组
    return {...state,entities:newEntities};//返回新state
    
}
const deleteTasklist=(state,action) => {
    const tasklist=action.payload;
    const newIds=state.ids.filter(id => id !== tasklist.id);//刨除id
    const newEntities=newIds.reduce((entities,id:string) => ({... entities, [id]: state.entities[id]}),{});
    const newSelectedIds=state.selectedIds.filter(id => id !== tasklist.id);
    return {
        ids:newIds,
        entities:newEntities,
        selectedIds:newSelectedIds,
    };
    
}
const loadTasklist=(state,action) => {
    const tasklists=action.payload;
    const incomingIds=tasklists.map(p => p.id);
    const newIds= _.difference(incomingIds,state.ids);//跟原有id不相同的保留
    const incomingEntities=_.chain(tasklists)
    .keyBy('id')//拿tasklist里面的id成为新成对象的key
    .mapValues(o => o)//这个对象本身当做value
    .value();//迭代，成为字典对象
    const newEntities=newIds.reduce((entities, id:string) => ({... entities, [id]:incomingEntities[id]}),{});
    return {
        ids:[...state.ids,...newIds],
        entities:{...state.entities,...newEntities},
        selectedIds:incomingIds,
    }; 
}
const swapTaskLists=(state,action)=>{
    const taskLists=<TaskList[]>action.payload;
    const updatedEntities =_.chain(taskLists)
    .keyBy('id')//拿tasklist里面的id成为新成对象的key
    .mapValues(o => o)//这个对象本身当做value
    .value();//迭代，成为字典对象
    const newEntities={...state.entities,...updatedEntities};
    return {
        ... state,//返回原selectedId
        entities:newEntities,
    };
}
const selectPrj =(state,action)=>{
    const selected =<Project>action.payload;
    const selectedIds=state.ids.filter(id => state.entities[id].projectId ===selected.id);
    return {
        ...state,
        selectedIds:selectedIds
    }
}
const deleteByPrj=(state,action)=>{
    const project =<Project>action.payload;
    const taskListIds = project.taskLists;
    const remainingIds =_.difference(state.ids,taskListIds);
    const remainingEntities =remainingIds
    .reduce((entities,id)=>({...entities,[id]:state.entities[id]}),{});//构造字典型对象
    return {
        ids:[...remainingIds],
        entities:remainingEntities,
        selectedIds:[]
    };

}

export function reducer(state = initialState, action: actions.Actions | prjactions.Actions): State {
    switch (action.type) {
        case actions.ADD_SUCCESS:
          return addTasklist(state, action);
        case actions.DELETE_SUCCESS:{
            return deleteTasklist(state, action);
        }
        case actions.UPDATE_SUCCESS:{
            return updateTasklist(state, action);
        }  
        case actions.LOAD_SUCCESS:{
          return loadTasklist(state, action);
        }
          case actions.SWAP_SUCCESS:{
            return swapTaskLists(state, action);
          }
          case prjactions.SELECT_PROJECT:{
              return selectPrj(state,action);
          }
        case prjactions.DELETE_SUCCESS:{
            return deleteByPrj(state,action);
        }
        default:
          return state;
      } 
}
export const getIds =(state:State) =>state.ids;
export const getEntities =(state:State) =>state.entities;
export const getSelectedIds =(state:State) =>state.selectedIds;

export const getSelected =createSelector(getIds,getEntities,(ids,entities)=>{
    return ids.map(id => entities[id]);
});
