import { Observable } from "rxjs/Observable";
import { environment } from '../../environments/environment';
// 控制台输出quote 调试用
declare module 'rxjs/Observable'{
    interface Observable<T>{
        debug:(...any) =>Observable<T>;
    }
}
Observable.prototype.debug=function(message: string){
    return this.do(
        (next)=>{
            if(!environment.production){
                console.log(message,next);
            }
        },
        (err)=>{
            if(!environment.production){
                console.error('Error>>',message,err);
            }
        },
        ()=>{
            if(!environment.production){
                console.log('-completed-');
            }
        },
    )
}