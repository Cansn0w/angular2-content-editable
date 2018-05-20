import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TextFormatterModule } from '../text-formatter/text-formatter.module';

import { ContentEditableComponent } from './content-editable.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextFormatterModule
  ],
  declarations: [
    ContentEditableComponent
  ],
  exports: [
    ContentEditableComponent
  ]
})
export class ContentEditableModule { }
