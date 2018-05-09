import { AppPage } from './app.po';

const TEST_STRING = 'test string.';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should render the component', () => {
    page.navigateTo();
    expect(page.getComponent()).toBeTruthy();
  });

  it('should be editable', async () => {
    page.navigateTo();
    await page.doubleClickComponent();
    await page.clearTextarea();
    await page.typeInTextarea(TEST_STRING);
    expect(page.getTextarea().getAttribute('value')).toEqual(TEST_STRING);
    await page.clickLogPanel();
    expect(page.getComponent().getText()).toEqual(TEST_STRING);
  });
});
