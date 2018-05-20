import { Component, Input } from '@angular/core';
import { TextType, Text } from './markdown.type';
import { MarkdownParser } from './parser.service';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css']
})
export class MarkdownComponent {

  readonly textType = TextType;

  viewModel: Text[] = [];
  @Input() set model(model: string) {
    this.viewModel = this.parser.parse(model);
  }

  constructor(private parser: MarkdownParser) { }
}
