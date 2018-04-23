import { NgModule,ElementRef } from '@angular/core';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule, MatChipsModule } from "@angular/material";
import { ProjectRoutingModule } from './project-routing.module';
import { InviteComponent } from './invite/invite.component';
import { ProjectDetailComponent } from './project-item/project-detail/project-detail.component';
import * as echarts from 'echarts';
import { NgxEchartsModule} from "ngx-echarts";

@NgModule({
  imports: [
    SharedModule,
    NgxEchartsModule,
    ProjectRoutingModule,
  ],
  declarations: [
    ProjectListComponent,
    ProjectItemComponent,
    NewProjectComponent,
    InviteComponent,
    ProjectDetailComponent,
     
  ],
  entryComponents:[
    NewProjectComponent,
    InviteComponent,
    
  ]
})
export class ProjectModule { }
