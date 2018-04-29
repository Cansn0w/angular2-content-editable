import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isEnabled = false;

  content = 'content';

  changeLog: string[] = [];
  
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

  static escape(text: string) {
    return text.replace(/\n/g, '\\n');
  }
}
