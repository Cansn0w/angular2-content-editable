import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownParser } from './parser.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    MarkdownParser
  ]
})
export class MarkdownModule { }
