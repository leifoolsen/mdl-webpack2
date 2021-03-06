/*
 * A naive SPA
 */

import eqjs from 'eq.js';
import { removeChildElements } from '../utils/utils';

const DRAWER = 'drawer';
const CONTENT = 'content';

class Drawer {

  constructor() {
    this.element_ = document.querySelector(`#${DRAWER}`);
    this.initEvents_();
  }

  get element() {
    return this.element_;
  }

  initEvents_() {

    for (const anchor of document.querySelectorAll(`#${DRAWER} nav a`)) {

      anchor.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();

        if(anchor.href !== anchor.baseURI) {

          const ce = new CustomEvent('select', {
            bubbles: true,
            cancelable: true,
            detail: {
              url: anchor.href
            }
          });
          this.element_.dispatchEvent(ce);
        }
      });
    }
  }
}

class Content {
  constructor() {
    this.element_ = document.querySelector(`#${CONTENT}`);
  }

  loadContent(url) {

    const removeOldContent = () => {
      const mdl = this.element_.querySelectorAll('.is-upgraded');
      componentHandler.downgradeElements([...mdl]);
      removeChildElements(this.element_);
    };

    const appendNewContent = text => {
      this.element_.insertAdjacentHTML('afterbegin', text);
      [...this.element_.querySelectorAll('script')].forEach( script => eval(script.innerHTML) );
    };

    // For now, only possible to load one fragment per page
    // Need a router to build a page from more than one fragment
    window.fetch(url, { method: 'get' })
      .then(response => {
        if(!response.ok) {
          throw Error(`${response.status} - ${response.statusText}`);
        }
        return response;
      })
      .then(response => response.text())
      .then(text => {
        removeOldContent();
        appendNewContent(text);
      })
      .catch(err => {
        removeOldContent();
        this.element_.insertAdjacentHTML('afterbegin',
          `<h5>Failed to load: "${url}"</h5><p style="color:red"><strong>${err}</strong></p>`);
      });
  }
}

const MutationObserver = window.MutationObserver
  || window.WebKitMutationObserver || window.MozMutationObserver;

const listenToDomInsertions = content => {
  new MutationObserver( mutations => {
    let callEqjs = false;
    for ( const mutation of mutations ) {
      if (mutation.addedNodes.length > 0) {
        console.log('***** Upgrading ', mutation.addedNodes.length, ' nodes');
        callEqjs = true;
        componentHandler.upgradeElements(mutation.addedNodes);
      }
    }
    if(callEqjs) {
      window.setTimeout( () => eqjs.all(false), 0);
    }
  }).observe( content, {
    attributes: false,
    childList: true,
    characterData: false,
    subtree: true
  });
};

class App {
  constructor() {
    this.drawer_ = new Drawer();
    this.content_ = new Content();

    this.drawer_.element.addEventListener('select', event => this.content_.loadContent(event.detail.url));
    listenToDomInsertions(document.querySelector('.mdl-layout__content'));
  }
  run() {
    console.info('***** Application started');
  }
}

export default App;
