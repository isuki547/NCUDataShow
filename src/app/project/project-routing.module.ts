import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { TaskListComponent } from "../task/task-list/task-list.component";
import { ChartsList1Component } from '../charts/charts-list1/charts-list1.component';
import { ChartsList2Component } from '../charts/charts-list2/charts-list2.component';

const routes: Routes = [
    { path: 'project', component: ProjectListComponent },
    { path: 'tasklists', component: TaskListComponent },
    { path: 'list1', component: ChartsList1Component },
    { path: 'list2', component: ChartsList2Component }
    
    
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectRoutingModule {}
