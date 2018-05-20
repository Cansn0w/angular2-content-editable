import { TextFormatterModule } from './text-formatter.module';

describe('MarkdownModule', () => {
  let markdownModule: TextFormatterModule;

  beforeEach(() => {
    markdownModule = new TextFormatterModule();
  });

  it('should create an instance', () => {
    expect(markdownModule).toBeTruthy();
  });
});
