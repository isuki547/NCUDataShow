import { Component, OnInit,Input,Output,EventEmitter,HostBinding,HostListener,ChangeDetectionStrategy} from '@angular/core';
import { cardAnim } from '../../anims/card.anim';
import {Project} from '../../domain';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations:[
    cardAnim
  ],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class ProjectItemComponent implements OnInit {

  @Input() item: Project;
  @Output() onInvite=new EventEmitter<void>();
  @Output() onEdit=new EventEmitter<void>();
  @Output() onDel=new EventEmitter<void>();  
  @Output() navClick= new EventEmitter<void>(); 
  @Output() onSelected= new EventEmitter<void>(); 
  @HostBinding('@card')cardState='out';
  // 绑定动画初始值


  constructor() { }

  ngOnInit() { 
  }

  @HostListener('mouseenter') onMouseEnter(){
  
  this.cardState='hover';
  }
  @HostListener('mouseleave') onMouseLeave(){
    this.cardState='out';
  }
  onInviteClick(ev: Event){
    ev.stopPropagation();//阻止冒泡
    this.onInvite.emit();
  }
  onEditClick(ev: Event){
    ev.stopPropagation();//阻止冒泡
    this.onEdit.emit();//往上发送事件
  }
  onDeleteClick(ev: Event){
    ev.stopPropagation();//阻止冒泡    
    this.onDel.emit();
  }
  onNavClick(ev: Event){
    ev.stopPropagation();//阻止冒泡    
    this.navClick.emit();
  }
  onClick(ev: Event){
    ev.preventDefault();

    this.onSelected.emit();
  }
}
