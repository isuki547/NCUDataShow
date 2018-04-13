import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
//处理多个组件拖拽


export interface DragData{
  tag:string;//标识拖拽，唯一性
  data:any;
}

@Injectable()
  export class DragDropService {

  private _dragData = new BehaviorSubject<DragData>(null);
  
  setDragData(data: DragData){
    this._dragData.next(data);
  }
  getDragData():Observable<DragData>{
    return this._dragData.asObservable();
  } 

  clearDragData(){
    this._dragData.next(null);
  }
}
