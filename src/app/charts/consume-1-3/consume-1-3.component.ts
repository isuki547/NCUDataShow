import { Component, Input, OnInit, Inject, ElementRef, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ReadjsonService } from '../../service/Readjson.service';
import { NgxEchartsService } from "ngx-echarts";
import { type } from '../../utils/type.util';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-consume-1-3',
  templateUrl: './consume-1-3.component.html',
  styleUrls: ['./consume-1-3.component.scss'],
  providers: [ReadjsonService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Consume13Component implements OnInit {
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
      // legend: {
      //     data:['九食堂','三食堂','青山湖北区食堂','六食堂','一食堂']
      // },
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
          data: ['1-4','1-5','1-6','1-7','1-8','1-9','1-10','3-21','3-22','3-23','3-24','3-25','3-26','3-27']
      },
      yAxis: {
          type: 'value',
          name:'次数'
      },
      series: [
          {
              name:'食堂消费总额',
              type:'line',
              stack: '消费额',
              data:[89135, 88740, 65139, 67259,92002,92637,89080,102689,102239,97612,69252,70318,104744,104423]
          }
        
        
      ]
  };
  


  }
}
