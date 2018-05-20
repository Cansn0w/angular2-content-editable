import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleFormatter } from './formatter.service';
import { TextFormatterComponent } from './text-formatter.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SimpleFormatter
  ],
  declarations: [
    TextFormatterComponent
  ],
  exports: [
    TextFormatterComponent
  ]
})
export class TextFormatterModule { }
