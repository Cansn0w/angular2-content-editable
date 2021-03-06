import { SimpleChange } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { TextFormatterModule } from '../text-formatter/text-formatter.module';
import { ContentEditableComponent } from './content-editable.component';
import { Formatter, SimpleFormatter } from '../text-formatter/formatter.service';

const TEST_STRING = 'test string.';

describe('ContentEditableComponent', () => {
  let component: ContentEditableComponent;
  let fixture: ComponentFixture<ContentEditableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentEditableComponent ],
      imports: [
        ReactiveFormsModule,
        TextFormatterModule
      ],
      providers: [
        { provide: Formatter, useClass: SimpleFormatter }
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render empty component', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.textContent).toEqual(' ');
  }));

  it('should render content when editing is disabled', async(() => {
    component.model = TEST_STRING;
    component.enabled = false;
    component.ngOnChanges();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.textContent).toEqual(TEST_STRING);
  }));
});
