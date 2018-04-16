import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxEchartsModule} from "ngx-echarts";
import { 
  MatInputModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatCardModule,
  MatDialogModule,
  MatGridListModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatRadioModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatSelectModule,
  MatSidenavModule,

  } from "@angular/material";
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DirectiveModule } from '../directive/directive.module';
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';

//导入导出
@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatRadioModule,
    MatNativeDateModule,    
    MatDatepickerModule,
    MatSelectModule,
    MatSidenavModule,
    NgxEchartsModule,
    DirectiveModule,
  
  ],
  exports:[
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatRadioModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatSidenavModule,
    DirectiveModule,
    ImageListSelectComponent,
  ],
  entryComponents:[ConfirmDialogComponent],
  declarations:[
     ConfirmDialogComponent,
     ImageListSelectComponent
    ]
})
export class SharedModule { }
