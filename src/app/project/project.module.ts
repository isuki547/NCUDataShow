import { NgModule,ElementRef } from '@angular/core';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule, MatChipsModule } from "@angular/material";
import { ProjectRoutingModule } from './project-routing.module';
import { InviteComponent } from './invite/invite.component';
import * as echarts from 'echarts';
import { NgxEchartsModule} from "ngx-echarts";
import { ReadjsonService } from '../service/Readjson.service';

@NgModule({
  imports: [
    SharedModule,
    NgxEchartsModule,
    ProjectRoutingModule,
    
  ],
  providers: [ReadjsonService],
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
