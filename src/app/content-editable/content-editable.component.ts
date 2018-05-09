import { Component, ElementRef, Input, Output, EventEmitter, ViewChild, SimpleChanges, AfterViewChecked, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

enum SnippetType {
  Text, LineBreak
}

class Snippet {
  type: SnippetType;
  content?: string;

  constructor(type: SnippetType, content?: string) {
    this.type = type;
    this.content = content;
  }
}

@Component({
  selector: 'app-content-editable',
  templateUrl: './content-editable.component.html',
  styleUrls: ['./content-editable.component.css']
})
export class ContentEditableComponent implements AfterViewChecked, OnChanges {

  private shouldUpdateSize: boolean;

  readonly snippetType = SnippetType;
  control = new FormControl();
  viewModel: Snippet[] = [new Snippet(SnippetType.Text, ' ')];

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

  ngOnChanges(changes: SimpleChanges) {
    if (this.enabled) {
      this.control.setValue(this.model, { emitEvent: false });
      if ('enabled' in changes) {
        this.shouldUpdateSize = true;
      }
    } else /* disable editing */ {
      this.viewModel = this.buildViewModel(this.model);
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

  private buildViewModel(content: string): Snippet[] {
    if (content === '') {
      return [new Snippet(SnippetType.Text, ' ')];
    }
    const lines = content.split('\n');
    const model: Snippet[] = [new Snippet(SnippetType.Text, lines[0])];
    for (let i = 1; i < lines.length; i++) {
      model.push(new Snippet(SnippetType.LineBreak));
      model.push(new Snippet(SnippetType.Text, lines[i]));
    }
    return model;
  }
}
