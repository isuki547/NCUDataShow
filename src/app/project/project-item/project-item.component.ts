import { Component, OnInit,Input,Output,EventEmitter,HostBinding,HostListener} from '@angular/core';
import { cardAnim } from '../../anims/card.anim';
@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations:[
    cardAnim
  ]

})
export class ProjectItemComponent implements OnInit {

  @Input() item;
  @Output() onInvite=new EventEmitter<void>();
  @Output() onEdit=new EventEmitter<void>();
  @Output() onDel=new EventEmitter<void>();  
  @Output() navClick= new EventEmitter<void>(); 
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
  onInviteClick(){
    this.onInvite.emit();
  }
  onEditClick(){
    this.onEdit.emit();//往上发送事件
  }
  onDeleteClick(){
    this.onDel.emit();
  }
  onNavClick(){
    this.navClick.emit();
  }
}
