import { Injectable, Inject } from '@angular/core';
import { Http, Response, Jsonp } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { Testechart } from '../domain/index';

@Injectable()
export class ReadjsonService {
    private headers = new Headers({
        'Content-Type': 'application/json'
    });
    constructor(
        private jsonp: Jsonp,
        private http: Http, 
        @Inject('BASE_CONFIG') private config,
        @Inject('SERVER') private server
        
    ) { }
    //get
    httpGet(url, params) {
        return this.http.get(url, { search: params })
            .map(res => res.json());
    }
    //本地读取json
    getJson(url) {
        return this.http.get(url)
            .map((res: Response) => res.json());

    }

    getjson() {
        const uri = `${this.config.uri}/echart`;
        return this.http.get(uri)
            .map((res: Response) => res.json());

    }
    getMonthService() {
       const uri=`${this.server.uri}/monthInfo `;
        return this.http.get(uri)
        //调用get请求数据
       .map((res: Response) => res.json());

    }
    getDayService() {
        const uri=`${this.server.uri}/dayInfo?size=700`;
         return this.http.get(uri)
        .map((res: Response) => res.json());
 
     }
     //查询数据
     SearchServive(uri){
        return this.http.get(uri)
        .map((res: Response) => res.json());
     }





}