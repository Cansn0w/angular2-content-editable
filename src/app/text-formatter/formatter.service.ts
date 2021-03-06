import { Injectable } from '@angular/core';
import { TextType, Text } from './text-formatter.type';

@Injectable()
export abstract class Formatter {
  abstract parse(content: string): Text[];
}

@Injectable()
export class SimpleFormatter implements Formatter {
  parse(content: string): Text[] {
    if (content === '') {
      return [new Text(TextType.Text, ' ')];
    }
    const lines = content.split('\n');
    const model: Text[] = [new Text(TextType.Text, lines[0])];
    for (let i = 1; i < lines.length; i++) {
      model.push(new Text(TextType.LineBreak));
      model.push(new Text(TextType.Text, lines[i]));
    }
    return model;
  }
}
