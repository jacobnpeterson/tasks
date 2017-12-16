import { MeanAppPage } from './app.po';

describe('tasks App', () => {
  let page: MeanAppPage;

  beforeEach(() => {
    page = new MeanAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
