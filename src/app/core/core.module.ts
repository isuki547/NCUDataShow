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
import { ServiceModule } from "../service/service.module";
import 'hammerjs';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import '../utils/debug.utill'
@NgModule({
  imports: [
    HttpModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    ServiceModule.forRoot(),
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
  ],
  providers:[
    {provide: 'BASE_CONFIG',useValue: {
      uri:'http://localhost:3000'
        }
     }
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
