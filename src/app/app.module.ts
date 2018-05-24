import { BrowserModule } from '@angular/platform-browser';
import { NgModule,ElementRef} from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule} from './core/core.module';
import { LoginModule } from "./login/login.module";
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { SharedModule } from "./shared/shared.module";
import { ReadjsonService } from './service/Readjson.service';
// import { HttpClientModule ,HttpClientJsonpModule} from "@angular/common/http";//angular5
import { HttpModule,JsonpModule } from "@angular/http";
import { AbmModule } from 'angular-baidu-maps';//百度地图
import { ChartsModule } from "./charts/charts.module";
@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    HttpModule,
    JsonpModule,
     BrowserModule, 
     LoginModule,
     CoreModule,
     ProjectModule,
     ChartsModule,
     TaskModule,
     SharedModule,
     AbmModule.forRoot({
      apiKey: 'CE6b29b9beebb8298fb5791c44b7b478' // app key为必选项
  })
  ],
  providers: [ReadjsonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
