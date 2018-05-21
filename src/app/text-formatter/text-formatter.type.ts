export enum TextType {
  Text, LineBreak
}

export class Text {
  type: TextType;
  content?: string;

  constructor(type: TextType, content?: string) {
    this.type = type;
    this.content = content;
  }
}
