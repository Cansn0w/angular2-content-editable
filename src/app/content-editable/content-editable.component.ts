import { Component, ElementRef, Input, Output, EventEmitter, ViewChild, SimpleChanges, AfterViewChecked } from '@angular/core';
import { FormControl } from '@angular/forms';

enum SnippetType {
  Space, Text, LineBreak
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
export class ContentEditableComponent implements AfterViewChecked {

  private readonly snippetType = SnippetType;
  private shouldUpdateSize: boolean;

  editorEnabled: boolean;
  control = new FormControl();
  viewModel: Snippet[];

  @ViewChild('textarea') private textarea: ElementRef;

  @Input() model: string;
  @Input() set enabled(isEnabled: boolean) {
    if (isEnabled) {
      this.initEditor();
    } else /* disable editing */ {
      this.initView();
    }
  }

  @Output() modelChange = new EventEmitter<string>();

  updateModel(model) {
    this.modelChange.emit(model);
    this.updateSize();
  }

  ngAfterViewChecked() {
    if (this.shouldUpdateSize) {
      this.updateSize();
      this.shouldUpdateSize = false;
    }
  }

  private initEditor() {
    this.editorEnabled = true;
    this.shouldUpdateSize = true;
    this.control.setValue(this.model, { emitEvent: false });
  }

  private initView() {
    this.editorEnabled = false;
    this.viewModel = this.buildViewModel(this.model);
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
      return [new Snippet(SnippetType.Space)];
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
