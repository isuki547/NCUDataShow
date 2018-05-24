import { Component, Input, OnInit, Inject, ElementRef, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ReadjsonService } from '../../service/Readjson.service';
import { NgxEchartsService } from "ngx-echarts";
import { type } from '../../utils/type.util';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-month-olnum',
  templateUrl: './month-olnum.component.html',
  styleUrls: ['./month-olnum.component.scss'],
  providers: [ReadjsonService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthOlnumComponent implements OnInit {

  @Input() months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  @Input() years = [2016, 2017, 2018];
  @Input() m;//查询的月
  @Input() y;//查询的年

  date: any = [];//时间
  logNum: any = [];//上网数量
  id: any = [];
  onelogNum: any;
  onedate: any;
  onLineNum: any = {};//获取的data
  onLineNumByMonthOption: any = {};//echart数据

  constructor(
    private readJsonService: ReadjsonService,
    private cd: ChangeDetectorRef,
    @Inject('SERVER') private server,
  ) { }
  ngOnInit(): void {
    //初始图表
    this.readJsonService.getMonthService().subscribe(echart => {
      //调用service层的getService方法，把获取到的json赋值给echart
      this.onLineNum = echart;
      console.log(this.onLineNum._embedded.monthInfoes);
      this.setOnlineByMonth(this.onLineNum._embedded.monthInfoes);
      //将数据传入
      this.cd.markForCheck();
    })
  }

  private setOnlineByMonth(onLineOption: any) {
    this.onLineNumByMonthOption = {};
    for (var i = 0; i < onLineOption.length; i++) {
      let date = onLineOption[i].year + '-' + onLineOption[i].month;
      //将获取到的数据let赋值到本地
      this.date[i] = date;
      let logNum = onLineOption[i].logNum;
      this.logNum[i] = logNum;
    }
    this.onLineNumByMonthOption = {
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
        '#0d47a1', '#512da8', '#d81b60', '#ff5722', '#43a047'
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
          name: '每月上网数量',
          type: 'line',
          stack: '数量',
          data: this.logNum
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
      this.onLineNumByMonthOption = {};
      let date = this.onLineNum.year + '-' + this.onLineNum.month;
      //将获取到的数据let赋值到本地
      this.onedate = date;
      let logNum = this.onLineNum.logNum;
      this.onelogNum = logNum;
      console.log(this.onedate, this.onelogNum);
      this.onLineNumByMonthOption = {
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
            name: '此月上网认证数量',
            type: 'bar',
            barWidth: 30,//柱图宽度
            stack: '数量',
            label: {
              normal: {
                  show: true,
                  position: 'top'
              }
          },
            data: [this.onelogNum]
          }
        ]

      }
      this.cd.markForCheck();

    })
  }

}
