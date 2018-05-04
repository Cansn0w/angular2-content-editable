import { Component, ViewChild } from '@angular/core';
import { ContentEditableComponent } from './content-editable/content-editable.component';

const resolvedPromise = Promise.resolve(null);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isEnabled = false;

  content = 'content\n[        ]spaces\nLine    3';

  changeLog: string[] = [];

  @ViewChild(ContentEditableComponent) ceComponent: ContentEditableComponent;
  
  contentUpdate(event: string) {
    this.changeLog.push(
      `${AppComponent.escape(this.content)} -> ${AppComponent.escape(event)}`
    );
    this.content = event;

    if (this.changeLog.length > 30) {
      this.changeLog.shift();
    }
  }

  getChangeLog() {
    return this.changeLog.join('\n');
  }

  onFocusout() {
    this.isEnabled = false;
  }

  onDblclick() {
    this.isEnabled = true;
    setTimeout(() => this.ceComponent.focus());
  }

  static escape(text: string) {
    return text.replace(/\n/g, '\\n');
  }
}
