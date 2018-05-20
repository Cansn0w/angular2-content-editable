import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from '../markdown/markdown.module';

import { ContentEditableComponent } from './content-editable.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MarkdownModule
  ],
  declarations: [
    ContentEditableComponent
  ],
  exports: [
    ContentEditableComponent
  ]
})
export class ContentEditableModule { }
