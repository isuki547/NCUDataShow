import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthOlnumComponent } from "./month-olnum/month-olnum.component";
import { ChartsList1Component } from "./charts-list1/charts-list1.component";
import { ChartsList2Component } from './charts-list2/charts-list2.component';
const routes: Routes = [
    { path: 'Monthlog', component: MonthOlnumComponent },
    { path: 'list1', component:ChartsList1Component  },
    { path: 'list2', component:ChartsList2Component  },
    
    
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChartsRoutingModule {}
