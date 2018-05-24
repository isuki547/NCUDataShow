import { Injectable,Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Quote } from '../domain/quote.model';
import { Http, Jsonp } from '@angular/http';

@Injectable()
export class QuoteService {
    constructor( private http:Http,@Inject('BASE_CONFIG') private config){
    }
    getQuote():Observable<Quote> {
        const uri=`${this.config.uri}/quotes/${Math.floor(Math.random()*4)}`;
        // 获取uri并且随机获取一条名言
        return this.http.get(uri)
        // get方式请求
        .debug('quote:' )
         .map(res =>res.json() as Quote);
    }
}