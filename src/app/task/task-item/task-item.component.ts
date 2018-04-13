import { Component, OnInit ,Input,Output,EventEmitter,HostListener,ChangeDetectionStrategy} from '@angular/core';
import { itemAnim } from "../../anims/item.anim";
@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations:[
    itemAnim
  ],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent implements OnInit {
  @Input() item;
  @Input() avatar;
  @Output() taskClick= new EventEmitter<void>()
  constructor() { }
  widerPriority='in';

  ngOnInit() {
  this.avatar=this.item.owner ? this.item.owner.avatar : 'unassigned';
  }
 
  onItemClick(){
    this.taskClick.emit();
  }
  onCheckBoxClick(ev:Event){
    ev.stopPropagation();//不往外传播,单选框点击不会打开任务
  }
  @HostListener('mouseenter')
  onMouseEnter(){
    this.widerPriority='out';
  }
  @HostListener('mouseleave')
  onMouseLeave(){
    this.widerPriority='in';
  }

}
