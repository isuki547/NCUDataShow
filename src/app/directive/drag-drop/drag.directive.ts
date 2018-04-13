import { Directive,HostListener,ElementRef,Renderer2,Input} from '@angular/core';
import { DragDropService } from '../drag-drop.service';



@Directive({
  selector: '[app-draggable][dragTag][dragData][draggedClass]'
})
export class DragDirective {

  private _isDraggble =false;
  // 设置组件是否能拖动
  // app-draggable=true执行
  @Input('app-draggable')//引用
  set isDraggable(val:boolean){
    this._isDraggble=val;
    this.rd.setAttribute(this.el.nativeElement,'draggable',`${val}`);
  }
  get isDraggble(){
    return this._isDraggble;
  }

  @Input() draggedClass:string;
  @Input() dragTag: string;
  @Input() dragData: any;

  constructor(
    private el:ElementRef,
    private rd:Renderer2,
    private service:DragDropService) { }

@HostListener('dragstart',['$event']) onDragStart(ev:Event){//拖
  if(this.el.nativeElement === ev.target){
    this.rd.addClass(this.el.nativeElement,this.draggedClass);//发起拖拽，往引用上增加class
    this.service.setDragData({tag:this.dragTag,data:this.dragData});
  }
}
@HostListener('dragend',['$event']) onDragEnd(ev:Event){//放
  if(this.el.nativeElement===ev.target){
    this.rd.removeClass(this.el.nativeElement,this.draggedClass);
  }
}
}
