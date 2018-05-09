import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ContentEditableModule } from './content-editable/content-editable.module';
import { ContentEditableComponent } from './content-editable/content-editable.component';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      imports: [
        ContentEditableModule,
        FormsModule
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render panels', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('.panel').length).toEqual(3);
  }));

  it('should render child component', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-content-editable')).toBeTruthy();
  }));
});

const TEST_STRING = 'test string.';
const TEST_STRING2 = 'yet another test string';
const PARAGRAPH = `This is a test paragraph
combined with new lines

and                       spaces`;

describe('Integrated content editable Component', () => {

  let appComponent: AppComponent;
  let component: ContentEditableComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      imports: [
        ContentEditableModule,
        FormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    component = appComponent.ceComponent;
    fixture.detectChanges();
  });

  it('should render with empty content', async(() => {
    appComponent.content = '';
    appComponent.isEnabled = false;
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement.querySelector('app-content-editable');
    expect(element.textContent).toEqual(' ');
  }));

  it('should render content', async(() => {
    appComponent.content = TEST_STRING;
    appComponent.isEnabled = false;
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement.querySelector('app-content-editable');
    expect(element.textContent).toEqual(TEST_STRING);
  }));

  it('should render paragraph with newlines and spaces', async(() => {
    appComponent.content = PARAGRAPH;
    appComponent.isEnabled = false;
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement.querySelector('app-content-editable');
    expect(element.innerText).toEqual(PARAGRAPH);
  }));

  it('should render content (input setting order inverted)', async(() => {
    appComponent.isEnabled = false;
    appComponent.content = TEST_STRING;
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement.querySelector('app-content-editable');
    expect(element.textContent).toEqual(TEST_STRING);
  }));

  it('should render textarea', async(() => {
    appComponent.isEnabled = true;
    appComponent.content = TEST_STRING;
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement.querySelector('app-content-editable textarea');
    expect(element.value).toEqual(TEST_STRING);
  }));

  it('should render textarea (input setting order inverted)', async(() => {
    appComponent.content = TEST_STRING;
    appComponent.isEnabled = true;
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement.querySelector('app-content-editable textarea');
    expect(element.value).toEqual(TEST_STRING);
  }));

  it('should update view when model changes', async(() => {
    appComponent.content = TEST_STRING;
    appComponent.isEnabled = false;
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement.querySelector('app-content-editable');
    expect(element.textContent).toEqual(TEST_STRING);

    appComponent.content = TEST_STRING2;
    fixture.detectChanges();
    expect(element.textContent).toEqual(TEST_STRING2);

    appComponent.content = TEST_STRING;
    fixture.detectChanges();
    expect(element.textContent).toEqual(TEST_STRING);
  }));

  it('should reflect model changes to textarea', async(() => {
    appComponent.content = TEST_STRING;
    appComponent.isEnabled = false;
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement.querySelector('app-content-editable');
    expect(element.textContent).toEqual(TEST_STRING);

    appComponent.content = TEST_STRING2;
    fixture.detectChanges();
    expect(element.textContent).toEqual(TEST_STRING2);

    appComponent.isEnabled = true;
    fixture.detectChanges();
    const textarea = fixture.debugElement.nativeElement.querySelector('app-content-editable textarea');
    expect(textarea.value).toEqual(TEST_STRING2);
  }));

  it('should update textarea when model changes', async(() => {
    appComponent.content = TEST_STRING;
    appComponent.isEnabled = true;
    fixture.detectChanges();
    const textarea = fixture.debugElement.nativeElement.querySelector('app-content-editable textarea');
    expect(textarea.value).toEqual(TEST_STRING);

    appComponent.content = TEST_STRING2;
    fixture.detectChanges();
    expect(textarea.value).toEqual(TEST_STRING2);
  }));
});
