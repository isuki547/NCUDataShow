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
  data:any[];
  data1:any[];
  constructor(
    private readJsonService: ReadjsonService,
    private cd: ChangeDetectorRef,
    @Inject('BASE_CONFIG') private server,
   ) {

  }

  ngOnInit() {
    this.readJsonService.getjson().subscribe(echart => {
      //调用service层的getService方法，把获取到的json赋值给echart
      this.shitang = echart;
      console.log(this.shitang);
      this.setshitang(this.shitang);
      //将数据传入
      this.cd.markForCheck();
    })
  }
  private setshitang(option1: any) {
    this.shitangOption = {};
     let name=option1.name;
    let data1=option1.data1;
    let data=option1.data;
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
        data: data1,
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
        data: data,
        type: 'bar'
      }]
    };


  }

}
