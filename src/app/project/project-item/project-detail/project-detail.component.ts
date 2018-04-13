import { Component, OnInit,ElementRef } from '@angular/core';
import { Http } from "@angular/http";
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  option1: any;
  
  constructor(http:Http) { 
   http.get('"URL"');
   
  }

  ngOnInit() {
  
  }
  loadjson(){
    this.option1={
      title: {
        text: '异步数据加载示例'
    },
    tooltip: {},
    legend: {
        data: ['发布排行']
    },
    xAxis: {
        data: []
    },
    yAxis: {
        splitLine: { show: false },//去除网格线
        name: ''
    },
    series: [{
        barWidth: "30px",
        name: '发布排行',
        type: 'bar',
        itemStyle: {
            normal: {
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#333'
                    }
                }
            }
        },
        data: []
    }]
  };
  }
  
  
}
