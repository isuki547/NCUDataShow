import { Component, OnInit,Output,EventEmitter } from '@angular/core';import { DomSanitizer } from "@angular/platform-browser";//svg图标导入
import { State, getAuthState } from '../../reducers/index';
import * as fromRoot from '../../reducers';
import {Store} from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Auth } from "../../domain/auth.model";
import * as actions from "../../actions/auth.action";
import { LogoutAction } from '../../actions/auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  auth$:Observable<Auth>;
  @Output() toggle =new EventEmitter<void>();//根组件知道被点击，不返回参数
  @Output() toggleDarkTheme= new EventEmitter<boolean>();//触发主题

  constructor(private store$: Store<fromRoot.State>){
    this.auth$ =this.store$.select(getAuthState)

   }
  ngOnInit() {
  }
  openSidebar(){
    this.toggle.emit();//发射事件
  }
 onChange(checked: boolean){
  this.toggleDarkTheme.emit(checked);
 }
 logout(){
   this.store$.dispatch(new actions.LogoutAction());
 }
}
