import { Component, ElementRef, Input, Output, EventEmitter, ViewChild, SimpleChanges, AfterViewChecked, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TextType, Text } from '../markdown/markdown.type';
import { MarkdownParser } from '../markdown/parser.service';

@Component({
  selector: 'app-content-editable',
  templateUrl: './content-editable.component.html',
  styleUrls: ['./content-editable.component.css']
})
export class ContentEditableComponent implements AfterViewChecked, OnChanges {

  private shouldUpdateSize: boolean;

  readonly textType = TextType;
  control = new FormControl();
  viewModel: Text[] = [new Text(TextType.Text, ' ')];

  @ViewChild('textarea') private textarea: ElementRef;

  @Input() model = '';
  @Input() enabled = false;
  @Output() modelChange = new EventEmitter<string>();

  constructor(private parser: MarkdownParser) {
    this.control.valueChanges.subscribe(content => {
      this.updateSize();
      this.modelChange.emit(content);
    });

  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.enabled) {
      this.control.setValue(this.model, { emitEvent: false });
      if ('enabled' in changes) {
        this.shouldUpdateSize = true;
      }
    } else /* disable editing */ {
      this.viewModel = this.parser.parse(this.model);
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
