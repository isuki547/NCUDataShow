import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-item/project-detail/project-detail.component';
import { TaskListComponent } from "../task/task-list/task-list.component";
const routes: Routes = [
    { path: 'project', component: ProjectListComponent },
    { path: 'tasklists', component: TaskListComponent },
    { path: 'project-detail', component: ProjectDetailComponent }
    
    
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectRoutingModule {}
