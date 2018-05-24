import { Component, OnInit,Input,Inject, ElementRef, OnDestroy ,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import { Http, Response } from '@angular/http';
import {  ReadjsonService } from '../../service/Readjson.service';
import { NgxEchartsService } from "ngx-echarts";
import { type } from '../../utils/type.util';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-charts-list1',
  templateUrl: './charts-list1.component.html',
  styleUrls: ['./charts-list1.component.scss']
})
export class ChartsList1Component implements OnInit {

  constructor(
    private readJsonService:ReadjsonService,
    private cd:ChangeDetectorRef,
    @Inject('BASE_CONFIG') private config
  ) { }

  sub:Subscription;
  ngOnInit() {
  }
 
}
