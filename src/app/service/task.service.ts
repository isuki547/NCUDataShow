import { Injectable,Inject } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Task } from '../domain/task.model';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';
import { TaskList } from '../domain/task-list.model';

@Injectable()
export class TaskService {
    private readonly domain = 'tasklists';
    data:Object;
    private headers = new Headers({
        'Content-Type':'application/json'
    });

    constructor(private http:Http,@Inject('BASE_CONFIG') private config){
    }
    //POST请求
    add(task:Task): Observable<Task>{
        task.id = null;//默认不带id
        const uri=`${this.config.uri}/${this.domain}`;
        return this.http
        .post(uri,JSON.stringify(task),{ headers:this.headers })
        .map(res => res.json());//系统默认返回
    }

    //PUT请求
    update(task:Task): Observable<Task>{
        const uri=`${this.config.uri}/${this.domain}/${task.id}`;
        const toUpdate={
            desc:task.desc,
            priority:task.priority,
            dueDate:task.dueDate,
            reminder:task.reminder,
            ownerId:task.ownerId,
            participantIds:task.participantIds,
            remark:task.remark
        };//改动
        return this.http
        .patch(uri,JSON.stringify(toUpdate),{ headers:this.headers })
        .map(res => res.json());//系统默认返回
    }

    //DELETE请求  多级删除 tasklist列表及其下面的task
    del(task:Task): Observable<Task>{
        const uri=`${this.config.uri}/tasklists/${task.id}`;
        return this.http
        .delete(uri)
        .mapTo(task);//
        }

     //GET请求 
    get(tasklistId:string): Observable<Task[]>{
        const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'tasklistId': tasklistId}})
      .map(res => res.json() as Task[]);
    }
    //get请求列表里所有的任务
    getbyList(list:TaskList[]):Observable<Task[]>{
        return Observable.from(list)
        .mergeMap(list =>this.get(list.id))
        .reduce((task: Task[],t: Task[])=>[...task,...t],[]);
    }
     //PUT请求 完成状态
     completed(task:Task): Observable<Task>{
        const uri=`${this.config.uri}/${this.domain}/${task.id}`;
       
        return this.http
        .patch(uri,JSON.stringify({completed: !task.completed}),{ headers:this.headers })
        .map(res => res.json());//系统默认返回
    }
    //put请求 移动任务
  move(taskId:string,tasklistId:string): Observable<Task>{
        const uri=`${this.config.uri}/${this.domain}/${taskId}`;     
        return this.http
        .patch(uri,JSON.stringify({taskliskId: tasklistId}),{ headers:this.headers })
        .map(res => res.json());//系统默认返回
    }
    //移动整个列表
    moveAll(srcListId:string,targetlistId:string): Observable<Task[]>{
        return this.get(srcListId)
        .mergeMap(tasks =>Observable.from(tasks))
        .mergeMap(task => this.move(task.id,targetlistId))
        .reduce((arr,x)=>[...arr,x],[]);
    }
}