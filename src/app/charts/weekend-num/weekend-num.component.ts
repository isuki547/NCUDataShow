import { Component, Input, OnInit, Inject, ElementRef, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ReadjsonService } from '../../service/Readjson.service';
import { NgxEchartsService } from "ngx-echarts";
import { type } from '../../utils/type.util';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-weekend-num',
  templateUrl: './weekend-num.component.html',
  styleUrls: ['./weekend-num.component.scss'],
  providers: [ReadjsonService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeekendNumComponent implements OnInit {
  weekendOption:any={};
  constructor() { }

  ngOnInit() {
    this.setshitang();
  }
  private setshitang(){
    this.weekendOption={
        tooltip: {
            trigger: 'axis'
        },
    
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis:  {
            type: 'category',
            name:'时段',
            boundaryGap: false,
            data: ['5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
        },
        yAxis: {
            type: 'value',
            name:'次'
          
        },
        series: [
            {
                name:'次数',
                type:'line',
                data:[1, 522, 4687, 6439, 4374, 2393, 17947,13685,1808,513,444,1537,12953,8784,1958,782,593,188,3],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            },
          
        ]
        
    };
  }
}
