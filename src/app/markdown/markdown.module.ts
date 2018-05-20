import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownParser } from './parser.service';
import { MarkdownComponent } from './markdown.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    MarkdownParser
  ],
  declarations: [
    MarkdownComponent
  ],
  exports: [
    MarkdownComponent
  ]
})
export class MarkdownModule { }
