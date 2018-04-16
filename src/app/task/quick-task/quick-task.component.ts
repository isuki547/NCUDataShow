import { Component, OnInit, HostListener,Output,EventEmitter } from '@angular/core';
import { NgForm } from "@angular/forms";
@Component({
  selector: 'app-quick-task',
  templateUrl: './quick-task.component.html',
  styleUrls: ['./quick-task.component.scss']
})
export class QuickTaskComponent implements OnInit {
  @Output() quickTask =new EventEmitter();
  desc:string;
  constructor() { }

  ngOnInit() {
  }
  @HostListener('keyup.enter')
  sendQuickTask(){
    // 为空或者输入多个空格
    if(!this.desc || this.desc.length ===0 || !this.desc.trim()){
      return;
    }
    this.quickTask.emit(this.desc);
    this.desc='';//回车后清空
  }
}
