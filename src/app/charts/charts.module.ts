import { NgModule,ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthOlnumComponent } from './month-olnum/month-olnum.component';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule, MatChipsModule,MatTableModule } from "@angular/material";
import * as echarts from 'echarts';
import { NgxEchartsModule} from "ngx-echarts";
import { ReadjsonService } from '../service/Readjson.service';
import { ChartsRoutingModule } from './charts-routing.module';
import { MonthOlmacComponent } from './month-olmac/month-olmac.component';
import { MonthOluserComponent } from './month-oluser/month-oluser.component';
import { MonthOlstuTeaComponent } from './month-olstu-tea/month-olstu-tea.component';
import { ChartsList1Component } from './charts-list1/charts-list1.component';
import { ChartsList2Component } from './charts-list2/charts-list2.component';
import { ConsumeShitangComponent } from './consume-shitang/consume-shitang.component';
import { ConsumeMonth125Component } from './consume-month12-5/consume-month12-5.component';
import { Consume13Component } from './consume-1-3/consume-1-3.component';
import { WorkdayNumComponent } from './workday-num/workday-num.component';
import { WeekendNumComponent } from './weekend-num/weekend-num.component';
import { ConsumeTypeComponent } from './consume-type/consume-type.component';
@NgModule({
  imports: [
    SharedModule,
    NgxEchartsModule,
    ChartsRoutingModule,
    MatTableModule,
  ],
  declarations: [
    MonthOlnumComponent,
    MonthOlmacComponent,
    MonthOluserComponent,
    MonthOlstuTeaComponent,
    ChartsList1Component,
    ChartsList2Component,
    ConsumeShitangComponent,
    ConsumeMonth125Component,
    Consume13Component,
    WorkdayNumComponent,
    WeekendNumComponent,
    ConsumeTypeComponent,
  ]
})
export class ChartsModule { }
