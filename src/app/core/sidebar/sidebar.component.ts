import { Component, OnInit,Output ,Input,EventEmitter,ChangeDetectionStrategy} from '@angular/core';
import { Store,select, } from '@ngrx/store';
import * as fromRoot from "../../reducers";
import {Project} from '../../domain';

import { getDate } from "date-fns";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class SidebarComponent implements OnInit {


  constructor(
  ) { }
 @Input() item: Project;

  @Input() projects: Project[];
  @Input() auth = false;
  @Output() navClicked = new EventEmitter<void>();
  @Output() prjClicked = new EventEmitter<Project>();
  today='day';

  ngOnInit() {
    this.today=`day${getDate(new Date())}`;
  }

  handleClicked(ev: Event) {
    ev.preventDefault();
    this.navClicked.emit();
    console.log('item:'+this.item);
  }

  onPrjClicked(ev: Event, prj: Project) {
    ev.preventDefault();
    this.prjClicked.emit(prj);
  }
}
