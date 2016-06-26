import jsdomify from 'jsdomify';
import { before, after, beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { removeChildElements } from '../../src/utils/utils';

describe('utils', () => {

  const fixture = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Fixture</title>
</head>
<body>
<main id="mount">
  <p>Paragraph #1</p>
  <p>Paragraph #2</p>
  <section>
    <p>Paragraph #3</p>
    <p class='foo'>Paragraph #4</p>
    <article>
      <p>Paragraph #5</p>
    </article>
  </section>
  <section>
    <p>Paragraph #6</p>
    <p class='foo'>Paragraph #7</p>
  </section>
</main>
</body>
</html>`;

  before ( () => {
    jsdomify.create(fixture);
  });

  after(() => {
    jsdomify.destroy();
  });

  describe('#removeChildElements', () => {

    beforeEach( () => {
      jsdomify.clear();

      const n = document.querySelector('#mount');
      expect(n.childNodes.length).to.be.above(0);
    });

    it('should remove child elements', () => {
      const element = removeChildElements(document.querySelector('#mount'));
      expect(element.childNodes).to.have.lengthOf(0);
    });

    it('should remove child elements with reflow = false', () => {
      const element = removeChildElements(document.querySelector('#mount'), false);
      expect(element.childNodes).to.have.lengthOf(0);
    });

  });

});
