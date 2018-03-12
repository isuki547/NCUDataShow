import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
  } from "@angular/material";
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

//导入导出
@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
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
    
  
  ],
  exports:[
    BrowserAnimationsModule,
    CommonModule,
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
    
    
  ],
  entryComponents:[ConfirmDialogComponent],
  declarations:[ConfirmDialogComponent]
})
export class SharedModule { }
