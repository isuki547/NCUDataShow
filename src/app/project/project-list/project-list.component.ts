import { Component, OnInit, OnDestroy,HostBinding,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { ConfirmDialogComponent } from "../../shared/confirm-dialog/confirm-dialog.component";
import { InviteComponent} from "../invite/invite.component";
import { SlideToRight } from "../../anims/router.anim";
import { listAnimation } from '../../anims/list.anim';
import { ProjectService } from '../../service/project.service';
import * as _ from 'lodash';
import { Project } from '../../domain/project.model';
import { Subscription } from 'rxjs/Subscription';
import { Store,select } from '@ngrx/store';
import * as fromRoot from "../../reducers";
import { Observable } from 'rxjs/Observable';
import * as actions from '../../actions/project.action';
import { map, take, switchMap, reduce, filter } from 'rxjs/operators';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations:[
    SlideToRight,
    listAnimation,
  ],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit ,OnDestroy{
 @HostBinding('@routerAnim') state;

  projects$ : Observable<Project[]>;
  listAnim$ : Observable<number>;//长度
  // sub:Subscription;

  constructor(
    private dialog: MatDialog,
    private cd:ChangeDetectorRef, 
    private store$: Store<fromRoot.State>) { 
      this.store$.dispatch(new actions.LoadAction(null));//加载
      this.projects$ = this.store$.pipe(select(fromRoot.getProjects));
      this.listAnim$ = this.projects$.map(p => p.length);
    }
    selectProject(project: Project) {
      this.store$.dispatch(new actions.SelectAction(project));
    }

  ngOnInit() {
  
   }
   ngOnDestroy(){

   }
  openNewProjectDialog(){
    const selectedImg=`/assets/img/covers/${Math.floor(Math.random()*5)}mini.jpg`;//默认选中的封面图
    const thumbnails$ = this.getThumbnails();

    const dialogRef=this.dialog.open(
      NewProjectComponent,{data:{thumbnails: thumbnails$,img:selectedImg}});
      dialogRef.afterClosed()
      .take(1)//取一个值后结束不需要一直监视
      .filter(n => n)//确保里面有值
      .map(val =>({... val,coverImg:this.buildImgBig(val.coverImg)}))
      .subscribe(project => {
        this.store$.dispatch(new actions.AddAction(project));
        // this.cd.markForCheck();
      });

      

    }
  // 编辑项目
    launchUpdateDialog(project:Project){
      const thumbnails$ = this.getThumbnails();
      const dialogRef=this.dialog.open(
        NewProjectComponent,
        {data:{thumbnails: thumbnails$,project: project}});
        // 取得当前项目的封面略缩图
        dialogRef.afterClosed()
        .take(1)//取一个值后结束
        .filter(n => n)//确保里面有值
        .map(val =>({... val,id: project.id, coverImg: this.buildImgBig(val.coverImg)}))
        // 将修改后的项目数据放入
        .subscribe(project => {
        this.store$.dispatch(new actions.UpdateAction(project));

          // dispatch更改项目的action
        });

    }
    lanuchConfirmDialog(project){
     const dialogRef=this.dialog.open(ConfirmDialogComponent,{data:{title:'删除监控',content:'确认删除监控？'}});
     dialogRef.afterClosed()
     .take(1)
     .filter(n => n)
     .subscribe(_ => {
     this.store$.dispatch(new actions.DeleteAction(project));

    });
  }

    // launchInviteDialog(project: Project) {
    //   let members = [];
    //   this.store$.select(fromRoot.getProjectMembers(project.id))
    //     .take(1)
    //     .subscribe(m => members = m);
    //   const dialogRef = this.dialog.open(InviteComponent, {data: { members: members}});
    //   // 使用 take(1) 来自动销毁订阅，take(1) 接收到 1 个数据后完成
    //   dialogRef.afterClosed().take(1).subscribe(val => {
    //     if (val) {
    //       this.store$.dispatch(new actions.InviteAction({projectId: project.id, members: val}));
    //     }
    //   });
    // }
    launchInviteDialog(){
      const dialogRef=this.dialog.open(InviteComponent,{data:{members:[] }});
  
    }
    //选择缩略图
    private getThumbnails(){
    return _.range(0,5)
    .map(i => `/assets/img/covers/${i}mini.jpg`);
   }
   //转化为大图
    private buildImgBig(img: string): string {
        return img.indexOf('mini') > -1 ? img.split('mini')[0] + '.jpg' : img;
      }
  
  }
  