import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { LayoutModule } from '@angular/cdk/layout';
import { ChartsModule } from 'ng2-charts';

import { MaterialModule } from './modules/material.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NutritionComponent } from '../components/nutrition/nutrition.component';

@NgModule({
  declarations: [ConfirmDialogComponent, NutritionComponent],
  imports: [
    CommonModule,
    LayoutModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ScrollingModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    LayoutModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MaterialModule,
    ScrollingModule,
    RouterModule,
    ConfirmDialogComponent,
    ChartsModule,
    NutritionComponent
  ],
  entryComponents: [ConfirmDialogComponent],
})
export class SharedModule { }
