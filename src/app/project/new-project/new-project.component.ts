import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA ,MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {
  title='';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<NewProjectComponent>,//泛型，返回的newproject类型
    ) { }

  ngOnInit() {
    this.title=this.data.title;
    console.log(JSON.stringify(this.data));//打印data 

  }
  onClick(){
    this.dialogRef.close('确定');//给project-list回传数据
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
