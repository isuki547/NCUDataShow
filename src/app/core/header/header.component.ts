import { Component, OnInit,Output,EventEmitter } from '@angular/core';import { DomSanitizer } from "@angular/platform-browser";//svg图标导入
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggle =new EventEmitter<void>();//根组件知道被点击，不返回参数
  @Output() toggleDarkTheme= new EventEmitter<boolean>();//触发主题
  constructor(){ }
  ngOnInit() {
  }
  openSidebar(){
    this.toggle.emit();//发射事件
  }
 onChange(checked: boolean){
  this.toggleDarkTheme.emit(checked);
 }
}
