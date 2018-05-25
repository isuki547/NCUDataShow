import * as actions from '../actions/project.action';
import { Project } from '../domain/index';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';
import { createSelector } from 'reselect';


export interface State {
        ids:string[];
        entities:{[id: string]:Project};//字典格式
        selectedId:string | null; 
};

const initialState: State = {
        ids:[],
        entities:{},
        selectedId:null,
};

const addProject=(state,action) => {
    const project = action.payload;
    if(state.entities[project.id]){//project存在,返回原状态
        return state;
    }
    const newIds=[... state.ids,project.id];//原来的ids展开，加入project id后，形成新数组
    const newEntities={... state.entities,[project.id]:project};//字典对象打散，加入projectid对应的对象，重组
    return {...state,ids:newIds,entities:newEntities};//返回新state
}

const updateProject=(state,action) => {
    const project=action.payload;
    const newEntities={... state.entities,[project.id]:project};//字典对象打散，加入projectid对应的对象，重组
    return {...state,entities:newEntities};//返回新state
    
}
const deleteProject=(state,action) => {
    const project=action.payload;
    const newIds=state.ids.filter(id => id !== project.id);//刨除id
    const newEntities=newIds.reduce((entities,id:string) => ({... entities, [id]: state.entities[id]}),{});
    return {
        ids:newIds,
        entities:newEntities,
        selectedId:null
    };
    
}
const loadProject=(state,action) => {
    const projects=action.payload;
    if (projects === null) {
        return state;
      }
    const incomingIds=projects.map(p => p.id);
    const newIds= _.difference(incomingIds,state.ids);//跟原有id不相同的保留
    const incomingEntities=_.chain(projects)
    .keyBy('id')//拿project里面的id成为新成对象的key
    .mapValues(o => o)//这个对象本身当做value
    .value();//迭代，成为字典对象
    const newEntities=newIds.reduce((entities,id:string) => ({... entities, [id]:incomingEntities[id]}),{});
    return {
        ids:[...state.ids,...newIds],
        entities:newEntities,
        selectedId:null
    }; 
}
export function reducer(state = initialState, action: actions.Actions ): State {
    switch (action.type) {
        case actions.ADD_SUCCESS:
          return addProject(state, action);
        case actions.DELETE_SUCCESS:{
            return deleteProject(state, action);
        }
        // case actions.INVITE_SUCCESS:
        case actions.UPDATE_SUCCESS:{
            return updateProject(state, action);
        }
       
        case actions.LOAD_SUCCESS:
          return loadProject(state, action);
        case actions.SELECT_PROJECT:
          return {...state, selectedId: action.payload.id};
        default:
          return state;
      }
}
export const getIds =(state:State) =>state.ids;
export const getEntities =(state:State) =>state.entities;
export const getSelectedId =(state:State) =>state.selectedId;
export const getAll =createSelector(getIds,getEntities,(ids,entities)=>{
    return ids.map(id => entities[id]);
})

