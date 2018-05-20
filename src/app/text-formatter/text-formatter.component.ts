import { Component, Input } from '@angular/core';
import { TextType, Text } from './text-formatter.type';
import { SimpleFormatter } from './formatter.service';

@Component({
  selector: 'app-text-formatter',
  templateUrl: './text-formatter.component.html',
  styleUrls: ['./text-formatter.component.css']
})
export class TextFormatterComponent {

  readonly textType = TextType;

  viewModel: Text[] = [];
  @Input() set model(model: string) {
    this.viewModel = this.parser.parse(model);
  }

  constructor(private parser: SimpleFormatter) { }
}
