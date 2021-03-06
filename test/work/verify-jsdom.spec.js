import jsdomify from 'jsdomify';
import { before, after, describe, it } from 'mocha';
import { expect } from 'chai';

describe('mocha-jsdom-jsdomify', () => {

  before ( () => {
    jsdomify.create('<!doctype html><html><body><div id="mount"></div></body></html>');
  });

  after(() => {
    jsdomify.destroy();
  });

  it('has document', () => {
    const div = document.createElement('div');
    expect(div.nodeName).eql('DIV');
  });

  it('works', () => {
    const content = document.querySelector('#mount');
    expect(content).to.not.be.null;
  });

  it('can render html', () => {
    const greeting = 'Hello, Hola, Hei';
    const p = document.createElement("P");
    const text = document.createTextNode(greeting);
    p.appendChild(text);

    const content = document.querySelector('#mount');
    content.appendChild(p);

    const paragraphs = document.querySelectorAll("P");
    expect(document.body.innerHTML).not.to.be.empty;
    expect(paragraphs.length).equal(1);
    expect(paragraphs[0].innerHTML).equal(greeting);
  });

});
