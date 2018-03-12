import { NgModule } from '@angular/core';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from "@angular/material";
import { ProjectRoutingModule } from './project-routing.module';
import { InviteComponent } from './invite/invite.component';
@NgModule({
  imports: [
    SharedModule,
    ProjectRoutingModule,


  ],
  declarations: [
    ProjectListComponent,
    ProjectItemComponent,
    NewProjectComponent,
    InviteComponent,
     
  ],
  entryComponents:[
    NewProjectComponent,
    InviteComponent,
    
  ]
})
export class ProjectModule { }
