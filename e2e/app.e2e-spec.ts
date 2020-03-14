import { NgPage } from './app.po';

describe('ng-saintdex App', function() {
  let page: NgPage;

  beforeEach(() => {
    page = new NgPage();
  });

  it('should display heading saying NG-Saintdex', () => {
    page.navigateTo();
    expect(page.getHeadingText()).toEqual('NG-Saintdex');
  });
});
