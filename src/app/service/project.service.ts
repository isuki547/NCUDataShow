import { Injectable,Inject } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Project } from '../domain/project.model';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';

@Injectable()
export class ProjectService {
    private readonly domain = 'projects';
    data:Object;
    private headers = new Headers({
        'Content-Type':'application/json'
    });

    constructor(private http:Http,@Inject('BASE_CONFIG') private config){
    }
    //POST请求
    add(project:Project): Observable<Project>{
        project.id = null;//默认不带id
        const uri=`${this.config.uri}/${this.domain}`;
        return this.http
        .post(uri,JSON.stringify(project),{ headers:this.headers })
        .map(res => res.json());//系统默认返回
    }

    //PUT请求
    update(project:Project): Observable<Project>{
        const uri=`${this.config.uri}/${this.domain}/${project.id}`;
        const toUpdate={
            name: project.name,
            desc:project.desc,
            coverImg:project.coverImg
        };//只允许改动这三项
        return this.http
        .patch(uri,JSON.stringify(toUpdate),{ headers:this.headers })
        .map(res => res.json());//系统默认返回
    }

    //DELETE请求  多级删除 tasklist列表及其下面的task
    del(project:Project): Observable<Project>{
        const delTasks$ =Observable.from(project.taskLists ? project.taskLists: [])
        .mergeMap(listId => this.http.delete(`${this.config.uri}/tasklists/${listId}`))//tasklist流中所有子数据即task流全部删除
        .count();//删除的数量
        return delTasks$
        .switchMap(_ => this.http.delete(`${this.config.uri}/${this.domain}/${project.id}`))//删除project
        .mapTo(project);//
        }

     //GET请求
    get(userId:string): Observable<Project[]>{
        const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'members_like': userId}, headers: this.headers})
      .map(res => res.json());
    }
  
}