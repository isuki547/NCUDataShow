import { Component, OnInit,OnDestroy,HostBinding,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { MoveTaskComponent } from '../move-task/move-task.component';
import { ConfirmDialogComponent } from "../../shared/confirm-dialog/confirm-dialog.component";
import { NewTaskListComponent } from "../new-task-list/new-task-list.component";
import { SlideToRight } from "../../anims/router.anim";
import { Subscription } from 'rxjs/Subscription';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { map, take, filter, withLatestFrom, switchMap } from 'rxjs/operators';

import * as fromRoot from '../../reducers';
import * as actions from '../../actions/task-list.action';
import { Observable } from 'rxjs/Observable';
import { TaskList } from '../../domain/index';
import { getTaskLists } from '../../reducers/index';


@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations:[
    SlideToRight
  ],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TaskHomeComponent implements OnInit,OnDestroy {

  @HostBinding('@routerAnim') state;
  sub:Subscription;
  projectId$:Observable<string>;
  lists$:Observable<TaskList[]>;
   constructor(
    private dialog:MatDialog,
    private cd:ChangeDetectorRef,
    private store$: Store<fromRoot.State>,
    private route: ActivatedRoute,
  ) { 
    this.projectId$=this.route.paramMap.pipe(map(p => <string>p.get('id')));
    this.lists$ = this.store$.pipe(select(fromRoot.getTaskLists));

  }


  ngOnInit() {
  }
  ngOnDestroy() {
    if(this.sub){
      this.sub.unsubscribe();
    }
  }
  launchNewTaskDialog(){
  this.dialog.open(NewTaskComponent,{data:{title:'新建任务:'}});
  }
  launchMoveTaskDialog(){
  // const dialogRef=this.dialog.open(MoveTaskComponent,{data:{lists:this.lists}});
  }
  launchUpdateTaskDialog(task){
  const dialogRef = this.dialog.open(NewTaskComponent,{data:{title:'修改任务:',task:task}})
  }
  launchConfirmDialog(list:TaskList){
    const dialogRef=this.dialog.open(ConfirmDialogComponent,{data:{title:'删除任务列表',content:'确认删除任务列表？'}});
    dialogRef.afterClosed()
    .take(1)
    .filter(n =>n)
    .subscribe(result => this.store$.dispatch(new actions.DeleteAction(list)));
}
  launchEditListDialog(list:TaskList){
    const dialogRef=this.dialog.open(NewTaskListComponent,{data:{title:'更改列表名称',taskList:list}});
    dialogRef.afterClosed() 
    .pipe( 
    take(1),
    filter(n => n)
  )
    .subscribe(result => this.store$.dispatch(new actions.UpdateAction({...result,id:list.id})));
}
  launchNewTaskListDialog(ev:Event){
    const dialogRef=this.dialog.open(NewTaskListComponent,{data:{title:'新建列表',content:'确认新建任务列表？'}});
     dialogRef.afterClosed()
     .pipe(
     take(1),
     filter(n => n)
     )
     .subscribe(result=>this.store$.dispatch(new actions.AddAction(result)));
     
  }
  handleMove(srcData,list){
    switch(srcData.tag){
      case 'task-item':
      console.log('handling item');
      break;
      case 'task-list':
      console.log('handling list');
      const srcList =srcData.data;
      const tempOrder=srcList.order;
      srcList.order=list.order;
      list.order=tempOrder;
      break;
      default:
      break;
    }

  }
  handleQuickTask(desc: string){
    console.log(desc);
  }
}