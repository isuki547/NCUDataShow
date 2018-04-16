import { Component, OnInit,Inject,ChangeDetectionStrategy } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-move-task',
  templateUrl: './move-task.component.html',
  styleUrls: ['./move-task.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MoveTaskComponent implements OnInit {
  lists: any[];
  constructor(@Inject(MAT_DIALOG_DATA) private data,
  private dialogRef:MatDialogRef<MoveTaskComponent>) { }

  ngOnInit() {
    this.lists=this.data.lists;
  }
  onClick(){
    
  }

}
