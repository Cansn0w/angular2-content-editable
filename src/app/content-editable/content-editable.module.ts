import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ContentEditableComponent } from './content-editable.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ContentEditableComponent
  ],
  exports: [
    ContentEditableComponent
  ]
})
export class ContentEditableModule { }
