import { Component, OnInit, HostBinding,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
 import { ConfirmDialogComponent } from "../../shared/confirm-dialog/confirm-dialog.component";
import { InviteComponent} from "../invite/invite.component";
import { SlideToRight } from "../../anims/router.anim";
import { listAnimation } from '../../anims/list.anim';


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
export class ProjectListComponent implements OnInit {
 @HostBinding('@routerAnim') state;

  projects=[
    {
      "id":1,
      "name":"监控1",
      "desc":"描述",
      "coverImg":"assets/img/covers/0.jpg"
    },
    {
      "id":2,
      "name":"监控2",
      "desc":"描述2",
      "coverImg":"assets/img/covers/1.jpg"
    },
  ];

  constructor(private dialog: MatDialog,private cd:ChangeDetectorRef) { }//调用者注入service
  
  ngOnInit() {
   }
  openNewProjectDialog(){
    const dialogRef=this.dialog.open(NewProjectComponent,{data:'新增监控'});
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        this.projects=[... this.projects,
           {id:3,name:'一个新项目',desc:'new project',coverImg:'assets/img/covers/2.jpg'},
           {id:4,name:'一个新项目',desc:'new project',coverImg:'assets/img/covers/3.jpg'}
          ]
      });
    }
  
    launchUpdateDialog(){
     const dialogRef=this.dialog.open(NewProjectComponent,{data:{title:'编辑监控'}});
    }
    lanuchConfirmDialog(project){
     const dialogRef=this.dialog.open(ConfirmDialogComponent,{data:{title:'删除监控',content:'确认删除监控？'}});
     dialogRef.afterClosed().subscribe(result=>console.log(result));
     this.projects=[... this.projects.filter(p=>p.id !== project.id)];
     this.cd.markForCheck();
    }
    launchInviteDialog(){
      const dialogRef=this.dialog.open(InviteComponent);
  
    }
      
  }