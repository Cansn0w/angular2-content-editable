import { Component, ElementRef, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from '@angular/core';

enum SnippetType {
  Space, Text, LineBreak
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
      if (changes['enabled'].currentValue) /* enabling editing */ {
        this.updateSize(this.textContent);
      } else /* disabling editing */ {
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
    this.cols = Math.max(lines.map(line => line.length).reduce((a, b) => a > b ? a : b), 1);
  }

  focus() {
    if (this.textarea) {
      this.textarea.nativeElement.focus();
    } else {
      throw new Error('Editing not enabled, cannot focus on textarea.');
    }
  }

  static buildViewModel(content: string): Snippet[] {
    if (content === '') {
      return [new Snippet(SnippetType.Space)]
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
