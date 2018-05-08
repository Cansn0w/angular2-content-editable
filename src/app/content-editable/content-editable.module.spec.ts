import { ContentEditableModule } from './content-editable.module';

describe('ContentEditableModule', () => {
  let contentEditableModule: ContentEditableModule;

  beforeEach(() => {
    contentEditableModule = new ContentEditableModule();
  });

  it('should create an instance', () => {
    expect(contentEditableModule).toBeTruthy();
  });
});
