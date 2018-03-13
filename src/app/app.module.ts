import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from "@angular/material";
import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule} from './core/core.module';
import { LoginModule } from "./login/login.module";
import { ProjectModule } from './project/project.module';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { TaskModule } from './task/task.module';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
     BrowserModule, 
     MatSidenavModule,
     AppRoutingModule,
     LoginModule,
     CoreModule,
     ProjectModule,
     TaskModule,
     BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
