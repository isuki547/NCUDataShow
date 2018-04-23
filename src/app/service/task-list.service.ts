import { Injectable,Inject } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { TaskList } from '../domain/task-list.model';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';

@Injectable()
export class TaskListService {
    private readonly domain = 'tasklists';
    data:Object;
    private headers = new Headers({
        'Content-Type':'application/json'
    });

    constructor(private http:Http,@Inject('BASE_CONFIG') private config){
    }
    //POST请求
    add(tasklist:TaskList): Observable<TaskList>{
        tasklist.id = null;//默认不带id
        const uri=`${this.config.uri}/${this.domain}`;
        return this.http
        .post(uri,JSON.stringify(tasklist),{ headers:this.headers })
        .map(res => res.json());//系统默认返回
    }

    //PUT请求
    update(tasklist:TaskList): Observable<TaskList>{
        const uri=`${this.config.uri}/${this.domain}/${tasklist.id}`;
        const toUpdate={
            name: tasklist.name
        };//只允许改动这三项
        return this.http
        .patch(uri,JSON.stringify(toUpdate),{ headers:this.headers })
        .map(res => res.json());//系统默认返回
    }

    //DELETE请求  多级删除 
    del(tasklist:TaskList): Observable<TaskList>{
       const uri=`${this.config.uri}/${this.domain}/${tasklist.id}`;
       return this.http.delete(uri)
       .mapTo(tasklist);
        }

     //GET请求
    get(projectId:string): Observable<TaskList[]>{
        const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'members_like': projectId}, headers: this.headers})
      .map(res => res.json());
    }
  //拖拽的交换顺序，order交换，服务器返回
  swapOrder(src:TaskList,target:TaskList):Observable<TaskList>{
      const draguri=`${this.config.uri}/${this.domain}/${src.id}`;
      const dropuri=`${this.config.uri}/${this.domain}/${target.id}`;
      const drag$=this.http
      .patch(draguri,JSON.stringify({order : target.order}),{headers: this.headers})
      .map(res=>res.json());
      const drop$=this.http
      .patch(dropuri,JSON.stringify({order : src.order}),{headers: this.headers})
      .map(res=>res.json());
      return Observable
      .concat(drag$,drop$)
      .reduce((arrs,list)=>[... arrs,list],[]);

  }
}
