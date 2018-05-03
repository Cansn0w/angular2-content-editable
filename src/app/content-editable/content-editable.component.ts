import { Component, ElementRef, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from '@angular/core';

enum SnippetType {
  Text, LineBreak
}

class Snippet {
  type: SnippetType;
  content?: string;

  constructor(type: SnippetType, content: string = '') {
    this.type = type;
    this.content = content;
  }
}

@Component({
  selector: 'app-content-editable',
  templateUrl: './content-editable.component.html',
  styleUrls: ['./content-editable.component.css']
})
export class ContentEditableComponent implements OnChanges {

  readonly snippetType = SnippetType;

  textContent: string;

  viewModel: Snippet[];
  rows: number;
  cols: number;

  @Input() enabled: boolean;
  @Input() model: string;
  @Output() modelChange = new EventEmitter<string>();
  @ViewChild('textarea') textarea: ElementRef;

  ngOnChanges(changes: SimpleChanges) {
    if ('model' in changes) {
      this.textContent = changes['model'].currentValue;
    }
    if ('enabled' in changes) {
      if (changes['enabled'].currentValue) /* is enabled */ {
        this.updateSize(this.textContent);
      } else /* is disabled */ {
        this.viewModel = ContentEditableComponent.buildViewModel(this.textContent);
      }
    }
  }

  updateContent(content) {
    this.updateSize(content);
    this.modelChange.emit(content);
  }

  updateSize(content: string) {
    const lines = content.split('\n');
    this.rows = lines.length;
    this.cols = lines.map(line => line.length).reduce((a, b) => a > b ? a : b) + 1;
  }

  focus() {
    if (this.textarea) {
      this.textarea.nativeElement.focus();
    } else {
      throw new Error('Editing not enabled, cannot focus on textarea.');
    }
  }

  static buildViewModel(content: string): Snippet[] {
    const lines = content.split('\n');
    const model: Snippet[] = [];
    if (lines.length > 0) {
      model.push(new Snippet(SnippetType.Text, lines[0]));
      for (let i = 1; i < lines.length; i++) {
        model.push(new Snippet(SnippetType.LineBreak));
        model.push(new Snippet(SnippetType.Text, lines[i]));
      }
    }
    return model;
  }
}
