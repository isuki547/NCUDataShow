import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consume-type',
  templateUrl: './consume-type.component.html',
  styleUrls: ['./consume-type.component.scss']
})
export class ConsumeTypeComponent implements OnInit {
typeoption:any={};
  constructor() { }

  ngOnInit() {
    this.setshitang();
    //将数据传入

  }
  private setshitang() {
    this.typeoption = {
      toolbox: {
        show: true,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
        }
    },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                
            }
        },
        legend: {
            data: ['用餐支出','校车刷卡', '商场购物','购电','圈水']
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
         yAxis:  {
            type: 'value',
            name:'次数'
        },
        xAxis: {
            type: 'category',
            data: ['3-21','3-22','3-23','3-24','3-25','3-26','3-27']
        },
        series: [
         {
                name: '用餐支出',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [106116, 104973, 101315, 72120, 73349, 109376, 108688]
            },
            {
                name: '校车刷卡',
                type: 'bar',
                stack: '总量',
                barWidth:40,
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [811, 784, 697, 462, 450, 724, 734]
            },
            {
                name: '商场购物',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [584, 652, 602, 137, 134, 593, 364]
            },
            {
                name: '购电',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [327, 281, 206, 217, 214, 309, 228]
            },
       
            {
                name: '圈水',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [1718, 1703, 1615, 925, 1371, 1824, 1660]
            }
              
        ]
    };
    }
}
