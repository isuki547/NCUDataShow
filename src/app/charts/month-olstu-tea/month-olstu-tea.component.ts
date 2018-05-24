import { Component, Input, OnInit, Inject, ElementRef, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ReadjsonService } from '../../service/Readjson.service';
import { NgxEchartsService } from "ngx-echarts";
import { type } from '../../utils/type.util';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-month-olstu-tea',
  templateUrl: './month-olstu-tea.component.html',
  styleUrls: ['./month-olstu-tea.component.scss'],
  providers: [ReadjsonService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthOlstuTeaComponent implements OnInit {
  @Input() months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  @Input() years = [2016, 2017, 2018];
  @Input() m;//查询的月
  @Input() y;//查询的年

  date: any = [];//时间
  studentNum: any = [];
  teacherNum: any = [];
  id: any = [];
  onestudentNum: any;
  oneteacherNum: any;
  onedate: any;

  onLineNum: any = {};//获取的data
  onLineStuTeaByMonthOption: any = {};
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
      console.log(this.onLineNum._embedded.monthInfoes);
      this.setOnlineByMonth(this.onLineNum._embedded.monthInfoes);
      //将数据传入
      this.cd.markForCheck();
    })

  }
  private setOnlineByMonth(onLineOption: any) {
    this.onLineStuTeaByMonthOption = {};
    for (var i = 0; i < onLineOption.length; i++) {
      let date = onLineOption[i].year + '-' + onLineOption[i].month;
      //将获取到的数据let赋值到本地
      this.date[i] = date;
      let teacherNum = onLineOption[i].teacherNum;
      this.teacherNum[i] = teacherNum;
      let studentNum = onLineOption[i].studentNum;
      this.studentNum[i] = studentNum;
    }
    this.onLineStuTeaByMonthOption = {
      title: {
        text: '每月教师学生上网数量',

      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['教师上网数量', '学生上网数量'],
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
      this.onLineStuTeaByMonthOption = {};
      let date = this.onLineNum.year + '-' + this.onLineNum.month;
      //将获取到的数据let赋值到本地
      this.onedate = date;
      let teacherNum = this.onLineNum.teacherNum;
      this.oneteacherNum = teacherNum;
      let studentNum = this.onLineNum.studentNum;
      this.onestudentNum = studentNum;
      console.log(this.onedate, this.onestudentNum,this.oneteacherNum);
      this.onLineStuTeaByMonthOption ={ title : {
        text: ' ',
        subtext: '',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        // formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x : 'center',
        y : 'bottom',
        data:['教师上网数量','学生上网数量'],
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: true,
                type: ['pie', 'funnel']
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    color: [
      '#512da8', '#d81b60', '#ff5722', '#43a047'
    ],
    calculable : true,
    series : [
      
        {
            name:'',
            type:'pie',
            radius : [30, 110],
            // center : ['75%', '50%'],
            roseType : 'area',
            data:[
                {value:[this.oneteacherNum], name:'教师上网数量'},
                {value:[this.onestudentNum], name:'学生上网数量'},
              
            ]
        }
    ]
}

      this.cd.markForCheck();

    })
  }
}
