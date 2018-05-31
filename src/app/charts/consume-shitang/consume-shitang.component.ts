import { Component, Input, OnInit, Inject, ElementRef, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ReadjsonService } from '../../service/Readjson.service';
import { NgxEchartsService } from "ngx-echarts";
import { type } from '../../utils/type.util';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-consume-shitang',
  templateUrl: './consume-shitang.component.html',
  styleUrls: ['./consume-shitang.component.scss'],
  providers: [ReadjsonService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsumeShitangComponent implements OnInit {

  shitang: any = {};//获取的data
  shitangOption: any = {};
  data: any[];
  data1: any[];
  constructor(
    private readJsonService: ReadjsonService,
    private cd: ChangeDetectorRef,
    @Inject('BASE_CONFIG') private server,
  ) {

  }

  ngOnInit() {

    this.setshitang(this.shitang);
    //将数据传入
    this.cd.markForCheck();

  }
  private setshitang(option1: any) {

    this.shitangOption = {

      tooltip: {
        trigger: 'axis'
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      color: [
        '#0d47a1', '#7e57c2', '#d81b60', '#ff5722', '#43a047'
      ],
      xAxis: {
        type: '',
        data:[
          "前湖一食堂",
          "前湖二食堂",
          "青山湖北区第一食堂",
          "青山湖北区第二食堂",
          "后勤管理处购电",
          "前湖三食堂",
          "前湖四食堂",
          "前湖五食堂",
          "前湖六食堂",
          "前湖行政楼食堂",
          "新世纪超市",
          "前湖医学院一食堂",
          "前湖医学院二食堂",
          "前湖清真第一食堂",
          "前湖九食堂",
          "前湖十食堂",
          "前湖0791美食城",
          "南大前湖游泳馆",
          "东湖食堂一楼",
          "东湖食堂二楼",
          "前湖服务大楼食堂",
          "青山湖北苑餐厅",
          "青山湖南区教工食堂",
          "前湖南院教工食堂",
          "前湖天健教工餐厅"
        ],
          axisLabel: {
      interval: 0,
        rotate: 90
    },
  },
  grid: {
    bottom: '30%'
  },
  yAxis: {
    min: 0,
    max: 80,
    interval: 10,
    type: 'value',
    name: '个'
  },
  series: [{
    name: '结算终端数',
    stack: '数量',
    barWidth: 10,//柱图宽度
    data: [41, 44, 12, 28, 1, 40, 33, 2, 77, 4, 11,
      57,
      1,
      9,
      72,
      39,
      31,
      1,
      28,
      18,
      25,
      2,
      2,
      3,
      8],
    type: 'bar'
  }]
};


  }

}

