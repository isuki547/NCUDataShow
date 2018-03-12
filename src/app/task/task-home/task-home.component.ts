import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { MoveTaskComponent } from '../move-task/move-task.component';
import { ConfirmDialogComponent } from "../../shared/confirm-dialog/confirm-dialog.component";
import { NewTaskListComponent } from "../new-task-list/new-task-list.component";
@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss']
})
export class TaskHomeComponent implements OnInit {


  lists=[
    {
      id:1,
      name:'代办',
      tasks:[
        {
          id:1,
          desc:'任务五：会见囧雪',
          completed:true,
          priority:1,
          owner:{
            id:1,
            name:'丹妮莉丝一世',
            avatar:'avatars:svg-11'
          },
          dueDate:new Date(),
        },
         {
          id:2,
          desc:'任务六：进攻兰尼斯特',
          completed:false,
          priority:2,
          owner:{
            id:1,
            name:'龙之母',
            avatar:'avatars:svg-12'
          },
          dueDate:new Date(),
          reminder:new Date(),
        }
      ]
    },
     {
      id:2,
      name:'进行中',
      tasks:[
        {
          id:1,
          desc:'任务三：征服弥林',
          completed:false,   
          priority:3,
          owner:{
            id:1,
            name:'弥林的女王',
            avatar:'avatars:svg-13'
          },
          dueDate:new Date(),
        },
         {
          id:2,
          desc:'任务四：到达龙石岛',
          completed:false,      
          priority:2,              
          owner:{
            id:1,
            name:'丹妮莉丝一世',
            avatar:'avatars:svg-14'
          },
          dueDate:new Date(),
        }
      ]
      },
     {
      id:3,
      name:'已完成',
      tasks:[
        {
          id:1,
          desc:'任务一：嫁给卓戈',
          completed:false,   
          priority:3,
          owner:{
            id:1,
            name:'丹妮莉丝',
            avatar:'avatars:svg-11'
          },
          dueDate:new Date(),
        },
         {
          id:2,
          desc:'任务二：孵化龙蛋',
          completed:false,      
          priority:2,              
          owner:{
            id:1,
            name:'卡丽熙',
            avatar:'avatars:svg-9'
          },
          dueDate:new Date(),
        },
      ]
    }
    ]
  constructor(private dialog:MatDialog) { }

  ngOnInit() {
  }
  launchNewTaskDialog(){
  this.dialog.open(NewTaskComponent,{data:{title:'新建任务:'}});
  }
  launchMoveTaskDialog(){
  const dialogRef=this.dialog.open(MoveTaskComponent,{data:{lists:this.lists}});
  }
  launchUpdateTaskDialog(task){
  const dialogRef = this.dialog.open(NewTaskComponent,{data:{title:'修改任务:',task:task}})
  }
  launchConfirmDialog(){
    const dialogRef=this.dialog.open(ConfirmDialogComponent,{data:{title:'删除任务列表',content:'确认删除任务列表？'}});
    dialogRef.afterClosed().subscribe(result=>console.log(result));
}
  launchEditListDialog(){
    const dialogRef=this.dialog.open(NewTaskListComponent,{data:{title:'更改列表名称',content:'确认更改？'}});
    dialogRef.afterClosed().subscribe(result=>console.log(result));

  }
  launchNewTaskListDialog(){
    const dialogRef=this.dialog.open(NewTaskListComponent,{data:{title:'新建列表',content:'确认新建任务列表？'}});
     dialogRef.afterClosed().subscribe(result=>console.log(result));
   
  }
}