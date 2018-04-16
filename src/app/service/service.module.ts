import { NgModule ,ModuleWithProviders} from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteService } from './quotes.service';

@NgModule()
export class ServiceModule { 
  static forRoot():ModuleWithProviders{
    return {
      ngModule:ServiceModule,
      providers: [
        QuoteService
      ]
    }
  }
}
