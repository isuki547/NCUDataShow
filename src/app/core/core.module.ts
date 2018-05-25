import { NgModule,SkipSelf,Optional } from '@angular/core';
import { HttpModule} from "@angular/http";//svgicon需要
import { HttpClientModule ,HttpClientJsonpModule} from "@angular/common/http";//angular5
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
import { AppEffectModule } from "../effects";
import { AppStoreModule } from "../reducers";
import 'hammerjs';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/count';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/defaultIfEmpty';

// import 'rxjs/add/observable/defaultIfEmpty';
// import 'rxjs/add/observable/ofType';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/observable/from';

import '../utils/debug.utill'
import { ReadjsonService } from '../service/Readjson.service';
@NgModule({
  imports: [
    HttpModule,
    HttpClientModule,
    HttpClientJsonpModule,
    SharedModule,
    AppRoutingModule,
    ServiceModule.forRoot(),
    AppStoreModule,
    AppEffectModule,
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
    //   uri:'http://222.204.2.232:8100/info/table'
    // }
     }, 
     {provide: 'SERVER',useValue: {
      uri:'http://222.204.2.232:8100'
        }
     },
     ReadjsonService
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
