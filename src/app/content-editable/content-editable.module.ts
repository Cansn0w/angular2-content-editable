import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ContentEditableComponent } from './content-editable.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ContentEditableComponent
  ],
  exports: [
    ContentEditableComponent
  ]
})
export class ContentEditableModule { }
