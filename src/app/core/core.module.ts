import { NgModule,SkipSelf,Optional } from '@angular/core';
import { HttpModule} from "@angular/http";//svgicon需要
import { HttpClientModule } from "@angular/common/http";//angular5
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { MatIconRegistry} from "@angular/material";
import { DomSanitizer} from "@angular/platform-browser";
import { loadSvgResource }from "../utils/svg.utill";
import { AppRoutingModule } from "../app-routing.module";
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";

import 'hammerjs';
@NgModule({
  imports: [
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AppRoutingModule,
  ]
})
export class CoreModule { 
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
        ir:MatIconRegistry,
        ds:DomSanitizer){
    if(parent){
      throw new Error('模块已存在，不能再次加载');
    }
    loadSvgResource(ir,ds);
  }
}
