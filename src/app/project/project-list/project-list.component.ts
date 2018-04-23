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
export class ProjectListComponent implements OnInit,OnDestroy {
 @HostBinding('@routerAnim') state;

  projects = [];
  sub:Subscription;

  constructor(private dialog: MatDialog,private cd:ChangeDetectorRef, private service$: ProjectService) { }//调用者注入service
  
  ngOnInit() {
    this.sub=this.service$.get("1").subscribe(projects =>{
      this.projects = projects;
      // console.log(this.projects);
       this.cd.markForCheck();
       
      })
    
   }
   ngOnDestroy() {
    if(this.sub){
      this.sub.unsubscribe();
    }
  }
  openNewProjectDialog(){

    const selectedImg=`/assets/img/covers/${Math.floor(Math.random()*5)}mini.jpg`;//默认选中的封面图
    const dialogRef=this.dialog.open(
      NewProjectComponent,{data:{thumbnails: this.getThumbnails(),img:selectedImg}});
      dialogRef.afterClosed()
      .take(1)//取一个值后结束不需要一直监视
      .filter(n => n)//确保里面有值
      .map(val =>({... val,coverImg:this.buildImgBig(val.coverImg)}))
      .switchMap(v => this.service$.add(v))
      .subscribe(project => {
        this.projects=[... this.projects,project];
        this.cd.markForCheck();
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
        .switchMap(v => this.service$.update(v))
        .subscribe(project => {
          const index =this.projects.map(p=> p.id).indexOf(project.id);
          this.projects=[... this.projects.slice(0, index), project, ...this.projects.slice(index + 1)];
          this.cd.markForCheck();
        });

    }
    lanuchConfirmDialog(project){
     const dialogRef=this.dialog.open(ConfirmDialogComponent,{data:{title:'删除监控',content:'确认删除监控？'}});
     dialogRef.afterClosed()
     .take(1)
     .filter(n => n)
     .switchMap(_ =>this.service$.del(project))
     .subscribe(prj => {
     this.projects=this.projects.filter(p => p.id !== prj.id);
     this.cd.markForCheck();
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
  