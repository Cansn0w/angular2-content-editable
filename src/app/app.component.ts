import { Component, ViewChild, DoCheck, ElementRef, OnInit } from '@angular/core';
import { ContentEditableComponent } from './content-editable/content-editable.component';

function escape(text: string) {
  return text.replace(/\n/g, '\\n');
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck, OnInit {

  controlEnabled = false;

  isEnabled = false;
  wasEnabled = this.isEnabled;
  content = 'content\n[        ]spaces\nLine    3';

  changeLog: string[] = [];

  changeDetectionCount = 0;

  containerDims = {
    x: 200,
    y: 200,
    top: 200,
    left: 200,
    right: 200,
    bottom: 200
  }

  @ViewChild(ContentEditableComponent) ceComponent: ContentEditableComponent;

  @ViewChild('container') containerEl: ElementRef;

  ngDoCheck() {
    this.changeDetectionCount += 1;
    if (this.isEnabled !==  this.wasEnabled) {
      setTimeout(() => this.updateMarkers());
      this.wasEnabled = this.isEnabled;
    }
  }

  ngOnInit() {
    setTimeout(() => this.updateMarkers());
  }

  contentUpdate(event: string) {
    this.changeLog.push(
      `${escape(this.content)} -> ${escape(event)}`
    );
    this.content = event;

    if (this.changeLog.length > 30) {
      this.changeLog.shift();
    }
    this.updateMarkers();
  }

  updateMarkers() {
    const height = this.getContainerHeight();
    const width = this.getContainerWidth();
    const dims = this.containerDims;
    dims.top = dims.y - height / 2;
    dims.left = dims.x - width / 2;
    dims.bottom = dims.y + height / 2;
    dims.right = dims.x + width / 2;
  }

  getContainerHeight() {
    return this.containerEl.nativeElement.offsetHeight;
  }

  getContainerWidth() {
    return this.containerEl.nativeElement.offsetWidth;
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
