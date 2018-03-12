import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
 import { ConfirmDialogComponent } from "../../shared/confirm-dialog/confirm-dialog.component";
import { InviteComponent} from "../invite/invite.component";


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects=[
    {
      "name":"监控1",
      "desc":"描述",
      "coverImg":"assets/img/covers/0.jpg"
    },
    {
      "name":"监控2",
      "desc":"描述2",
      "coverImg":"assets/img/covers/1.jpg"
    },
  ];

  constructor(private dialog: MatDialog) { }//调用者注入service
  
  ngOnInit() {
   }
  openNewProjectDialog(){
    const dialogRef=this.dialog.open(NewProjectComponent,{data:'新增监控'});
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
      });
    }
  
    launchUpdateDialog(){
     const dialogRef=this.dialog.open(NewProjectComponent,{data:{title:'编辑监控'}});
    }
    lanuchConfirmDialog(){
     const dialogRef=this.dialog.open(ConfirmDialogComponent,{data:{title:'删除监控',content:'确认删除监控？'}});
     dialogRef.afterClosed().subscribe(result=>console.log(result));
    }
    launchInviteDialog(){
      const dialogRef=this.dialog.open(InviteComponent);
  
    }
      
  }