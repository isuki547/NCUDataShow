import { Component, OnInit } from '@angular/core';
import { getDate } from "date-fns";
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }
   
   today='day';
  ngOnInit() {
    this.today=`day${getDate(new Date())}`;
  }

}
