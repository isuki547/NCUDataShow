import { Component, Input, OnInit, Inject, ElementRef, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ReadjsonService } from '../../service/Readjson.service';
import { NgxEchartsService } from "ngx-echarts";
import { type } from '../../utils/type.util';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-month-olmac',
  templateUrl: './month-olmac.component.html',
  styleUrls: ['./month-olmac.component.scss'],
  providers: [ReadjsonService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthOlmacComponent implements OnInit {

  @Input() months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  @Input() years = [2016, 2017, 2018];
  @Input() m;//查询的月
  @Input() y;//查询的年

  onemacNum: any;
  onedate: any;
  date: any = [];//时间
 
  macNum:any =[];//mac地址数量
  id: any = [];

  onLineNum: any = {};//获取的data
  onLinemacByMonthOption:any={};
  constructor(
    private readJsonService: ReadjsonService,
    private cd: ChangeDetectorRef,
    @Inject('SERVER') private server,
  ) { }

  ngOnInit() {
    //初始图表
    this.readJsonService.getMonthService().subscribe(echart => {
      //调用service层的getService方法，把获取到的json赋值给echart
      this.onLineNum = echart;
      // console.log(this.onLineNum._embedded.monthInfoes);
      this.setOnlineByMonth(this.onLineNum._embedded.monthInfoes);
      //将数据传入
      this.cd.markForCheck();
    })
  }

  private setOnlineByMonth(onLineOption: any) {
    this.onLinemacByMonthOption = {};
    for (var i = 0; i < onLineOption.length; i++) {
      let date = onLineOption[i].year + '-' + onLineOption[i].month;
      //将获取到的数据let赋值到本地
      this.date[i] = date;
      let macNum = onLineOption[i].macNum;
      this.macNum[i] = macNum;
    }
    this.onLinemacByMonthOption = {
      //echart画图
      title: {
          text: ' ',
          x: 'center',
          align: 'right'
      },
      tooltip: {
          trigger: 'axis'
      }, 
       toolbox: {
          feature: {
              saveAsImage: {}
          }
      },
      color:[
          '#0d47a1','#7e57c2','#d81b60','#ff5722','#43a047'
      ],
      xAxis: {
          type: 'category',
          data: this.date,
          name: '时间'
      },
      yAxis: {
          type: 'value',
          name: '个',
      },
      series: [
          {
              name: 'mac地址数量',
              type: 'line',
              stack: '数量',
              data: this.macNum
          }
      ]

  }

  }
  //查询某月的记录
  onSearch(y, m) {
    const uri = `${this.server.uri}/monthInfo/30`;
    // +'y'+'-'+'m';
    console.log(uri);
    this.readJsonService.SearchServive(uri).subscribe(echart => {
      //调用service层的getService方法，把获取到的json赋值给echart
      this.onLineNum = echart;
      console.log(this.onLineNum);
      //将数据传入
      this.onLinemacByMonthOption = {};
      let date = this.onLineNum.year + '-' + this.onLineNum.month;
      //将获取到的数据let赋值到本地
      this.onedate = date;
      let macNum = this.onLineNum.macNum;
      this.onemacNum = macNum;
      console.log(this.onedate, this.onemacNum);
      this.onLinemacByMonthOption = {
        title: {
          text: ' ',
          x: 'center',
          align: 'right'
        },
        tooltip: {
          trigger: 'axis'
        },

        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        color: [
          '#512da8', '#d81b60', '#ff5722', '#43a047'
        ],
        xAxis: {
          type: 'category',
          data: [this.onedate],
          name: '时间'
        },
        yAxis: {
          type: 'value',
          name: '个',
        },
        series: [
          {
            name: '此月上网mac数量',
            type: 'bar',
            barWidth: 30,//柱图宽度
            stack: '数量',
            label: {
              normal: {
                  show: true,
                  position: 'top'
              }
          },
            data: [this.onemacNum]
          }
        ]

      }
      this.cd.markForCheck();

    })
  }

}
