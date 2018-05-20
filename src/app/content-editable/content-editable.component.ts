import { Component, ElementRef, Input, Output, EventEmitter, ViewChild, AfterViewChecked, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-content-editable',
  templateUrl: './content-editable.component.html',
  styleUrls: ['./content-editable.component.css']
})
export class ContentEditableComponent implements AfterViewChecked, OnChanges {

  private shouldUpdateSize: boolean;

  control = new FormControl();

  @ViewChild('textarea') private textarea: ElementRef;

  @Input() model = '';
  @Input() enabled = false;
  @Output() modelChange = new EventEmitter<string>();

  constructor() {
    this.control.valueChanges.subscribe(content => {
      this.updateSize();
      this.modelChange.emit(content);
    });

  }

  ngOnChanges() {
    if (this.enabled) {
      this.control.setValue(this.model, { emitEvent: false });
      this.shouldUpdateSize = true;
    }
  }

  ngAfterViewChecked() {
    if (this.shouldUpdateSize) {
      this.updateSize();
      this.shouldUpdateSize = false;
    }
  }

  private updateSize() {
    this.textarea.nativeElement.style.width = '0px';
    this.textarea.nativeElement.style.width = `${this.textarea.nativeElement.scrollWidth + 8}px`;
    this.textarea.nativeElement.style.height = '0px';
    this.textarea.nativeElement.style.height = `${this.textarea.nativeElement.scrollHeight}px`;
  }

  public focus() {
    this.textarea.nativeElement.focus();
  }
}
