import { Component, Input, OnInit, Inject, ElementRef, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ReadjsonService } from '../../service/Readjson.service';
import { NgxEchartsService } from "ngx-echarts";
import { type } from '../../utils/type.util';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-consume-month12-5',
  templateUrl: './consume-month12-5.component.html',
  styleUrls: ['./consume-month12-5.component.scss'],
  providers: [ReadjsonService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsumeMonth125Component implements OnInit {
  monthOption:any={};
  constructor(
    private readJsonService: ReadjsonService,
    private cd: ChangeDetectorRef,
    @Inject('BASE_CONFIG') private server,
  ) { }

  ngOnInit() {
    this.setshitang();
    //将数据传入
    this.cd.markForCheck();
  }
  private setshitang() {
    // this.monthOption = {};
    this.monthOption = {
      title: {
      
      },
      tooltip: {
          trigger: 'axis'
      },
      legend: {
          data:['九食堂','三食堂','医学院第一食堂','六食堂','一食堂']
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
        color:[
            '#0d47a1','#7e57c2','#d81b60','#ff5722','#43a047'
        ],
      toolbox: {
          feature: {
              saveAsImage: {}
          }
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['十二月','一月','三月','四月']
      },
      yAxis: {
          type: 'value'
      },
      series: [
          {
              name:'九食堂',
              type:'line',
              stack: '消费额',
              data:[122573, 99853, 121462, 104793]
          },
          {
              name:'三食堂',
              type:'line',
              stack: '消费金额',
              data:[39765, 28864, 36648,29894]
          },
          {
              name:'医学院第一食堂',
              type:'line',
              stack: '总量',
              data:[58964, 52422,51976,42863 ]
          },
          {
              name:'六食堂',
              type:'line',
              stack: '',
              data:[53521, 45658, 51064, 44361,]
          },
          {
              name:'一食堂',
              type:'line',
              stack: '',
              data:[33787, 20863, 31193, 24538,]
          }
      ]
  };
  


  }
}
