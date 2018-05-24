import { Component, OnInit,Inject, ElementRef, OnDestroy ,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import { Http, Response } from '@angular/http';
import {  ReadjsonService } from '../../../service/Readjson.service';

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

    date: any = [];//时间
    logNum: any = [];//上网数量
    userNum:any =[];//用户数量
    macNum:any =[];//mac地址数量
    studentNum:any=[];
    teacherNum:any=[];
    id: any = [];

    onLineNum: any = {};//获取的data
    onLineNumByMonthOption: any = {};//echart数据
    onLinemacByMothOption:any={};
    onLineuserByMonthOption:any={};
    onLineStuTeaByMonthOption:any={};
    


    onLineNumbyDay:any ={};
    onLinelogbyDayOption:any ={};
    onLinemacByDayOption:any={};
    onLineuserByDayOption:any={};
    onLineStuTeaByDayOption:any={};
// -------server-------
//    url=`222.204.2.232:8100/monthInfo`; 

  constructor(
      private readJsonService:ReadjsonService,
      private cd:ChangeDetectorRef,
      @Inject('BASE_CONFIG') private config
  ){}   

  sub:Subscription;

  ngOnInit() :void{

     this.readJsonService.getMonthService().subscribe(echart =>{
         //调用service层的getService方法，把获取到的json赋值给echart
         this.onLineNum =echart;
        console.log(this.onLineNum._embedded.monthInfoes);        
        this.setOnlineByMonth(this.onLineNum._embedded.monthInfoes);
        //将数据传入
        this.cd.markForCheck();
     })
   
     this.readJsonService.getDayService().subscribe(echart =>{
        this.onLineNumbyDay =echart;
       console.log(this.onLineNumbyDay._embedded.dayInfoes);        
       this.setOnlineNumByday(this.onLineNumbyDay._embedded.dayInfoes);
       this.cd.markForCheck();
    })
  
}

private setOnlineByMonth(onLineOption:any){
    this.onLinemacByMothOption={};
    //不同的图表对应不同的option
    this.onLineuserByMonthOption={};
    this.onLineNumByMonthOption={};
    for (var i = 0; i < onLineOption.length; i++) {
        let date = onLineOption[i].year+'-'+onLineOption[i].month ;
        //将获取到的数据let赋值到本地
        this.date[i] = date;
        let macNum = onLineOption[i].macNum;
        this.macNum[i] = macNum;
        let userNum = onLineOption[i].userNum;
        this.userNum[i] = userNum;
        let logNum = onLineOption[i].logNum;
        this.logNum[i] = logNum;
        let teacherNum=onLineOption[i].teacherNum;
        this.teacherNum[i]=teacherNum;
        let studentNum=onLineOption[i].studentNum;
        this.studentNum[i]=studentNum;
    }
    this.onLinemacByMothOption = {
        //echart画图
        title: {
            text: 'mac地址数量',
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
        },color:[
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
    this.onLineuserByMonthOption = {
        title: {
            text: '每月用户数量',
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
        },color:[
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
                name: '每月用户数量',
                type: 'line',
                stack: '数量',
                data: this.userNum
            }
        ]

    }
    this.onLineNumByMonthOption = {
        title: {
            text: '每月认证次数',
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
            '#0d47a1','#512da8','#d81b60','#ff5722','#43a047'
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
    this.onLineStuTeaByMonthOption={
        title: {
            text: '每月教师学生上网数量',
           
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['教师上网数量','学生上网数量'],
        },   
         toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        color:[
            '#0d47a1','#512da8','#d81b60','#ff5722','#43a047'
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
                name: '教师上网数量',
                type: 'line',
                stack: '数量',
                data: this.teacherNum,
            },
            {
                name: '学生上网数量',
                type: 'line',
                stack: '数量',
                data: this.studentNum,
            }
        ]
    }
}




private setOnlineNumByday(onLinelogbyDayOption:any){
    this.onLinelogbyDayOption = {};

        for (var i = 0; i < onLinelogbyDayOption.length; i++) {
            let date = onLinelogbyDayOption[i].year+'-'+onLinelogbyDayOption[i].month + '-' + onLinelogbyDayOption[i].day;
            this.date[i] = date;
            let logNum = onLinelogbyDayOption[i].logNum;
            this.logNum[i] = logNum;
            let id = onLinelogbyDayOption[i].id;
            this.id[i] = id;
            let macNum = onLinelogbyDayOption[i].macNum;
            this.macNum[i] = macNum;
            let userNum = onLinelogbyDayOption[i].userNum;
            this.userNum[i] = userNum;
            let teacherNum=onLinelogbyDayOption[i].teacherNum;
            this.teacherNum[i]=teacherNum;
            let studentNum=onLinelogbyDayOption[i].studentNum;
            this.studentNum[i]=studentNum;
        }
        this.onLinelogbyDayOption = {
            title: {
                text: '每日用户认证次数',
                x: 'center',
                align: 'right'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                }
            }, 
             dataZoom: [{
                startValue: '2016-07-16'
            }, {
                type: 'inside'
            }],
            // legend: {
            //     // data:['每日数量'], 
               

            // },      
             toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                data: this.date,
                name: '时间'
            },
            yAxis: {
                type: 'value',
                name: '个',
            },
            visualMap: {
                top: 10,
                right: 10,
                pieces: [{
                    gt: 0,
                    lte: 20000,
                    color: '#096'
                }, {
                    gt: 20000,
                    lte: 40000,
                    color: '#ffde33'
                }, {
                    gt: 40000,
                    lte: 60000,
                    color: '#ff9933'
                }, {
                    gt: 60000,
                    lte: 80000,
                    color: '#cc0033'
                }, {
                    gt: 80000,
                    lte: 100000,
                    color: '#660099'
                }, {
                    gt: 1000000,
                    color: '#7e0023'
                }],
                outOfRange: {
                    color: '#999'
                }
            },
            series: [
                {
                    name: '每日数量',
                    type: 'line',
                    stack: '数量',
                    data: this.logNum,
                    markLine: {
                        silent: true,
                        data: [{
                            yAxis: 20000
                        }, {
                            yAxis: 40000
                        }, {
                            yAxis: 60000
                        }, {
                            yAxis: 80000
                        }, {
                            yAxis: 100000
                        }]
                    }
                }
            ]

        }
        this.onLinemacByDayOption = {
            title: {
                text: '每日mac地址数量',
                x:'center,'
            },
            tooltip: {
                trigger: 'axis'
            },
             
             toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },color:[
               '#d81b60','#ff5722','#43a047'
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
        this.onLineuserByDayOption = {
            title: {
                text: '每日用户数量',
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
            },color:[
                '#d81b60','#ff5722','#43a047'
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
                    name: '每日用户数量',
                    type: 'line',
                    stack: '数量',
                    data: this.userNum
                }
            ]
            
    
        }
      
        this.onLineStuTeaByDayOption={
            title: {
                text: '每日教师学生上网数量',
                
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['教师上网数量','学生上网数量'],
            },   
             toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            color:[
              '#ff5722','#43a047'
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
                    name: '教师上网数量',
                    type: 'line',
                    stack: '数量',
                    data: this.teacherNum,
                },
                {
                    name: '学生上网数量',
                    type: 'line',
                    stack: '数量',
                    data: this.studentNum,
                }
            ]
        }

}


 ngOnDestroy(){
    if(this.sub){
        this.sub.unsubscribe();
      }
}
}