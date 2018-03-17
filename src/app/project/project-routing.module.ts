import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from "./project-item/project-detail/project-detail.component";
const routes: Routes = [
    { path: 'project', component: ProjectListComponent },
    { path: 'project-detail', component: ProjectDetailComponent }
    
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectRoutingModule {}
