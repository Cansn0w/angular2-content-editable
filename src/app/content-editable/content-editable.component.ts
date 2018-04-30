import { Component, OnChanges, HostListener, ElementRef, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

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
export class ContentEditableComponent {

  textContent: string;

  readonly snippetType = SnippetType;

  private changed = false;
  private viewModelCache: Snippet[];

  @Input('enabled') editingEnabled: boolean;

  @Input() set model(content: string) {
    this.textContent = content;
    this.changed = true;
  }
  
  @Output('modelChange') update = new EventEmitter<string>();

  updateContent(event) {
    this.update.emit(event);
  }

  get viewModel(): Snippet[] {
    if (this.changed) {
      this.viewModelCache = ContentEditableComponent.buildViewModel(this.textContent);
      this.changed = false;
    }
    return this.viewModelCache;
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
