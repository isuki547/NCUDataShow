import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workday-num',
  templateUrl: './workday-num.component.html',
  styleUrls: ['./workday-num.component.scss']
})
export class WorkdayNumComponent implements OnInit {

workOption:any={};
  constructor() { }

  ngOnInit() {
    this.setshitang();
  }
private setshitang(){
  this.workOption={
    tooltip: {
        trigger: 'axis'
    },
    color:[
      '#0d47a1','#7e57c2','#d81b60','#ff5722','#43a047'
  ],
  legend: {
    data: ['工作日','周末']
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
        name:'时段',
        type: 'category',
        boundaryGap: false,
        data: ['5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
    },
    yAxis: {
        type: 'value',
        name:'次'
      
    },
    series: [
        {
          name:'工作日',
          type:'line',
            data:[5,2251, 15468, 5234, 5729, 1655, 25840, 21797,1338,343,970,1741,18881,15414,2325,1113,1018,207,5],
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
        {
          name:'周末',
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
      }
      
    ]
    
};
}
}
