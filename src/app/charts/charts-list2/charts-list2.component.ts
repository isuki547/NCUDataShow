import { Component, OnInit, Input, Inject, ElementRef, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ReadjsonService } from '../../service/Readjson.service';
import { NgxEchartsService } from "ngx-echarts";
import { type } from '../../utils/type.util';
import { Subscription } from 'rxjs/Subscription';
import { } from "module";
@Component({
  selector: 'app-charts-list2',
  templateUrl: './charts-list2.component.html',
  styleUrls: ['./charts-list2.component.scss']
})
export class ChartsList2Component implements OnInit {

  option1: any={};
  option:any={};

  displayedColumns = ['position', 'morning', 'noon', 'night', 'num'];
  elements = [
    { position: 'A', morning: 3.79, noon: 8.39, night: 8.29, num: 14018 },
    { position: 'B', morning: 3.22, noon: 5.42, night: 6.6, num: 9471 },
    { position: 'C', morning: 6.26, noon: 9.13, night: 11.95, num: 4267 },
    { position: 'D', morning: 6.71, noon: 18.03, night: 15.25, num: 1045 },
    { position: 'E', morning: 3.97, noon: 12.13, night: 10.20, num: 5991 },
  ];

  constructor(
    private readJsonService: ReadjsonService,
    private cd: ChangeDetectorRef,
    @Inject('BASE_CONFIG') private config
  ) { }

  sub: Subscription;
  ngOnInit() {
  }

}

