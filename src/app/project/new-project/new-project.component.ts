import { Component, OnInit,Inject ,ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA ,MatDialogRef} from '@angular/material';
import { FormGroup, FormBuilder,ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NewProjectComponent implements OnInit {
  title='';
  coverImages=[];
  form :FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<NewProjectComponent>,//泛型，返回的newproject类型
    private fb:FormBuilder
    ) { }

  ngOnInit() {
    this.coverImages=this.data.thumbnails;
    // 获取当前封面略缩图
    if(this.data.project){
      // 项目存在时，此为修改项目窗口
      this.form = this.fb.group({
        name:[this.data.project.name,Validators.required],
        desc:[this.data.project.desc],
        coverImg:[this.data.project.coverImg]
      });
      this.title="修改项目:";
    }else {
      // 项目数据为空时，此为创建项目窗口
      this.form = this.fb.group({
        name:['',Validators.required],
        desc:[],
        coverImg:[this.data.img]
      });
      this.title='创建项目:';
    }
  }
  onSubmit({value,valid}, ev: Event){
    ev.preventDefault();
    this.dialogRef.close(value);//给project-list回传数据
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
