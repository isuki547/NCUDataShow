import { Directive,HostListener,ElementRef,Renderer2,
         Input,Output,EventEmitter} from '@angular/core';
import { DragDropService, DragData } from '../drag-drop.service';



@Directive({
  selector: '[app-droppable][dropTags][dragEnterClass]'
})
export class DropDirective {


  @Output() dropped= new EventEmitter<DragData>();
  @Input() dragEnterClass:string;
  @Input() dropTags: string[] =[];//数组
  private data$;


  constructor(
    private el:ElementRef,
    private rd:Renderer2,
    private service:DragDropService) {
      this.data$=this.service.getDragData().take(1);
     }

  @HostListener('dragenter',['$event'])//进入领域
  onDragEnter(ev:Event){
    ev.preventDefault();
    ev.stopPropagation();
    if(this.el.nativeElement=== ev.target){
      this.data$.subscribe(dragData=>{
        if(this.dropTags.indexOf(dragData.tag)> -1){//drop数组是否包含了dragtag
          this.rd.addClass(this.el.nativeElement,this.dragEnterClass);//发起拖拽，引用上增加class
        }   
      });
    }
  }
  @HostListener('dragover',['$event'])//在本层上面
  onDragOver(ev:Event){
    ev.preventDefault();
    ev.stopPropagation();
    if(this.el.nativeElement=== ev.target){
      this.data$.subscribe(dragData=>{
        if(this.dropTags.indexOf(dragData.tag)> -1){//drop数组是否包含了dragtag
          this.rd.setProperty(ev,'dataTransfer.effectAllowed','all');
          this.rd.setProperty(ev,'dataTransfer.dropEffect','move');
        }else{
          this.rd.setProperty(ev,'dataTransfer.effectAllowed','none');
          this.rd.setProperty(ev,'dataTransfer.dropEffect','none');
        }
      });
    }
  }
  @HostListener('dragleave',['$event'])
  onDragLeave(ev:Event){
    ev.preventDefault();
    ev.stopPropagation();
    if(this.el.nativeElement=== ev.target){
      this.data$.subscribe(dragData=>{
        if(this.dropTags.indexOf(dragData.tag)> -1){//drop数组是否包含了dragtag
          this.rd.removeClass(this.el.nativeElement,this.dragEnterClass);
        }   
      });
    }
  }
  @HostListener('drop',['$event'])
  onDrop(ev:Event){
    ev.preventDefault();
    ev.stopPropagation();
    if(this.el.nativeElement=== ev.target){
      this.data$.subscribe(dragData=>{
        if(this.dropTags.indexOf(dragData.tag)> -1){//drop数组是否包含了dragtag
          this.rd.removeClass(this.el.nativeElement,this.dragEnterClass);
          this.dropped.emit(dragData);
          this.service.clearDragData();
        }   
      });
    }
  }
}
