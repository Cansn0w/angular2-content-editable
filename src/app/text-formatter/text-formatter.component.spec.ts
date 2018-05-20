import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFormatterComponent } from './text-formatter.component';
import { SimpleFormatter } from './formatter.service';

describe('TextFormatterComponent', () => {
  let component: TextFormatterComponent;
  let fixture: ComponentFixture<TextFormatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextFormatterComponent ],
      providers: [ SimpleFormatter ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFormatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
