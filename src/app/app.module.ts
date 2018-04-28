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
     TaskModule,
     SharedModule,
  ],
  providers: [ReadjsonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
