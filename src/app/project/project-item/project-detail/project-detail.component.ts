import { Component, OnInit,Inject, ElementRef, OnDestroy ,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import { Http, Response } from '@angular/http';
import {  ReadjsonService } from '../../../service/Readjson.service';
import { URLSearchParams } from "@angular/http";
import { NgxEchartsService } from "ngx-echarts";
import { type } from '../../../utils/type.util';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  providers:[ReadjsonService],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProjectDetailComponent implements OnInit,OnDestroy {

  option1: any={};
   option:any={};
   uri=`${this.config.uri}/echart`;
  constructor(
      private readJsonService:ReadjsonService,
      private cd:ChangeDetectorRef,
      @Inject('BASE_CONFIG') private config
  ){}   
  sub:Subscription;

  ngOnInit() :void{

    this.readJsonService.getjson().subscribe(echart =>{
    this.option1 =echart;
    console.log('echart:'+echart);
    console.log(this.option1);
    this.setOption1(this.option1);//渲染图表
     this.cd.markForCheck();
   
    })
  

 
}
ngOnDestroy(){
    if(this.sub){
        this.sub.unsubscribe();
      }
}

private setOption1(option1:any){
    this.option={};
    let name=option1.name;
    let date=option1.date;
    let data1=option1.data1;
    let data2=option1.data2;
   this.option={
    title: {
        text: name
    },
    tooltip: {
        trigger: 'axis'
    },
       xAxis:{
           type:'category',
           data:date,        
       },
       yAxis:{
           type:'value',
           name:'值',        
       },
       series:[
        {
            name:'data1',
            type:'line',
            stack: '总量',
            data:data1
           },
            {
            name:'data2',
            type:'line',
            stack: '总量',
            data:data2
           },
       ]

   }
}
  
}
    // this.option1 = {
    //     xAxis: {
    //         type: 'category',
    //         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    //     },
    //     yAxis: {
    //         type: 'value'
    //     },
    //     series: [{
    //         data: [820, 932, 901, 934, 1290, 1330, 1320],
    //         type: 'line'
    //     }]
    // };
//   this.isLoading =true;