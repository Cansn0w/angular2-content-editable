import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TextFormatterModule } from '../text-formatter/text-formatter.module';
import { Formatter, SimpleFormatter } from '../text-formatter/formatter.service';

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
  providers: [
    { provide: Formatter, useClass: SimpleFormatter }
  ],
  exports: [
    ContentEditableComponent
  ]
})
export class ContentEditableModule { }
