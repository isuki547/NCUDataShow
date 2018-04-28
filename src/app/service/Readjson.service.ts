import { Injectable, Inject } from '@angular/core';
import { Http, Response, Jsonp } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { Testechart } from '../domain/index';

@Injectable()

export class ReadjsonService {
    private headers = new Headers({
        'Content-Type': 'application/json'
    });
    constructor(private jsonp: Jsonp, private http: Http, @Inject('BASE_CONFIG') private config) { }
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







}