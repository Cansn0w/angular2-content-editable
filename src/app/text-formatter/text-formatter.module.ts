import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFormatterComponent } from './text-formatter.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TextFormatterComponent
  ],
  exports: [
    TextFormatterComponent
  ]
})
export class TextFormatterModule { }
