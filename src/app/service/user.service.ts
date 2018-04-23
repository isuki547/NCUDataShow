import { Injectable,Inject } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Project } from '../domain/project.model';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';
import { User } from '../domain/user.model';

@Injectable()
export class UserService {
    private readonly domain = 'users';
    data:Object;
    private headers = new Headers({
        'Content-Type':'application/json'
    });

    constructor(private http:Http,@Inject('BASE_CONFIG') private config){
    }
    //查询用户
    searchUsers(filter:string): Observable<User[]>{
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
          .get(uri, {params: {'email_like': filter}})
          .map(res => res.json() as User[]);
    }
    //按照项目查询
    getUsersByProject(projectId:string): Observable<User[]>{
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
          .get(uri, {params: {'projectId': projectId}})
          .map(res => res.json() as User[]);
    }
    //加入项目
    addProjectRef(user:User,projectId:string):Observable<User>{
        const uri = `${this.config.uri}/${this.domain}/${user.id}`;
        const projectIds=user.projectIds ? user.projectIds :[];
        if(projectIds.indexOf(projectId)>-1){
            return Observable.of(user);
        }
        const toAdd=[... projectIds,projectId];
        return this.http
        .patch(uri, JSON.stringify({projectIds: toAdd}),{ headers:this.headers })
        .map(res => res.json() as User);
        
    }
     //删除项目，解除关系
     removeProjectRef(user:User,projectId:string):Observable<User>{
        const uri = `${this.config.uri}/${this.domain}/${user.id}`;
        const projectIds=user.projectIds ? user.projectIds :[];
        const index =projectIds.indexOf(projectId);
        if(index === -1){//不存在,直接返回
            return Observable.of(user);
        }
        const toUpdate= [... projectIds.slice(0,index),... projectIds.slice(index + 1)];
        return this.http
        .patch(uri, JSON.stringify({projectIds: toUpdate}),{ headers:this.headers })
        .map(res => res.json() as User);
        
    }
    //批量增加
   batchUpdateProjectRef(project:Project):Observable<User[]>{
       const projectId=project.id;
       const membersIds=project.members ? project.members :[];
       return Observable.from(membersIds)
       .switchMap(id =>{
        const uri = `${this.config.uri}/${this.domain}/${id}`;
        return this.http.get(uri).map(res =>res.json() as User);
       })
       .filter(user => user.projectIds.indexOf(projectId)=== -1)
       .switchMap(u => this.addProjectRef(u,projectId))
       .reduce((arr,curr)=> [... arr,curr],[]);
   } 
}