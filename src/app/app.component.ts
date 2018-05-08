import { Component, ViewChild, DoCheck } from '@angular/core';
import { ContentEditableComponent } from './content-editable/content-editable.component';

function escape(text: string) {
  return text.replace(/\n/g, '\\n');
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {

  isEnabled = false;

  content = 'content\n[        ]spaces\nLine    3';

  changeLog: string[] = [];

  changeDetectionCount = 0;

  @ViewChild(ContentEditableComponent) ceComponent: ContentEditableComponent;

  ngDoCheck() {
    this.changeDetectionCount += 1;
  }

  contentUpdate(event: string) {
    this.changeLog.push(
      `${escape(this.content)} -> ${escape(event)}`
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
}
