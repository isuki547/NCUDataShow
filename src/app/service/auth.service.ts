import { Injectable,Inject } from '@angular/core';
import { Http, Headers, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';
import { User } from '../domain/index';
import { Auth } from '../domain/auth.model';

@Injectable()
export class AuthService {
    private readonly domain = 'users';
    data:Object;
    private headers = new Headers({
        'Content-Type':'application/json'
    });
    private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
    '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9' +
    '.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';

    constructor(private http:Http,@Inject('BASE_CONFIG') private config){
    }
    //POST请求 注册
    register(user:User): Observable<Auth>{
        // user.id = null;//默认不带id
        const uri=`${this.config.uri} /${this.domain}`;
        return this.http
        .get(uri,{params:{'email': user.email}})
        .switchMap(res =>{
            if(res.json().length > 0){
                throw 'user.existed';
            }
            return this.http
            .post(uri,JSON.stringify(user),{ headers:this.headers })
            .map(r => ({token: this.token,user: r.json()}));
        })
       
    }

    //PUT请求 登录
    login(username:string,password:string): Observable<Auth>{
        const uri=`${this.config.uri}/${this.domain}`;
        //连接数据库查询用户是否存在
        return this.http
       .get(uri,{params:{'name':username,'password':password}})
       //读取返回数据
        .map(res => {
            if(res.json().length ===0){
                throw 'username or password not match';
            }
            return{
                token: this.token,
                user:res.json()[0]
            };
        });
      
    }

  
}