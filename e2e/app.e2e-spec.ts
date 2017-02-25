import { Demo3Page } from './app.po';

describe('demo3 App', function() {
  let page: Demo3Page;

  beforeEach(() => {
    page = new Demo3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
