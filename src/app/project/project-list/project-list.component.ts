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
    
      this.projects$ = this.store$.select(fromRoot.getProjects);
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
    const dialogRef=this.dialog.open(
      NewProjectComponent,{data:{thumbnails: this.getThumbnails(),img:selectedImg}});
      dialogRef.afterClosed()
      .take(1)//取一个值后结束不需要一直监视
      .filter(n => n)//确保里面有值
      .map(val =>({... val,coverImg:this.buildImgBig(val.coverImg)}))
      .subscribe(project => {
        this.store$.dispatch(new actions.AddAction(project));
        // this.cd.markForCheck();
      });
      

    }
  
    launchUpdateDialog(project:Project){
      const dialogRef=this.dialog.open(
        NewProjectComponent,
        {data:{thumbnails: this.getThumbnails(),project: project}});
        dialogRef.afterClosed()
        .take(1)//取一个值后结束
        .filter(n => n)//确保里面有值
        .map(val =>({... val,id: project.id, coverImg: this.buildImgBig(val.coverImg)}))
        .subscribe(project => {
        this.store$.dispatch(new actions.UpdateAction(project));
          
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
  