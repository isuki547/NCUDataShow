import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import {  BrowserAnimationsModule} from "@angular/platform-browser/animations";

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class InviteComponent implements OnInit {
  items=[
    {
      id: 1,
      name: '张三',
    },
    {
      id:2,
      name:'李四',
    },
    {
      id:3,
      name:'王五',
    }

  ]
  constructor() { }

  ngOnInit() {
  }

  displayUser(user:{id: string; name:string}){
  return user? user.name : '';
  }  
onClick(){
  
}
}
