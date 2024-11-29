console.debug('content script');

injectMainScript();
const highlighter = injectComponentToHTML('gogova-simple');

const setMarkerPosition = (markerPosition: {
  left?: number;
  top?: number;
  display: string;
}) => {
  highlighter.setAttribute('markerPosition', JSON.stringify(markerPosition));
};

const getSelectedText = () => window.getSelection()!.toString();

document.addEventListener('click', () => {
  if (getSelectedText().length > 0) {
    setMarkerPosition(getMarkerPosition());
  }
});

document.addEventListener('selectionchange', () => {
  if (getSelectedText().length === 0) {
    setMarkerPosition({ display: 'none' });
  }
});

function getMarkerPosition() {
  const rangeBounds = window
    .getSelection()!
    .getRangeAt(0)
    .getBoundingClientRect();
  return {
    // Subtract width of marker button -> 40px / 2 = 20
    left: rangeBounds.left + rangeBounds.width / 2 - 20,
    top: rangeBounds.top - 30,
    display: 'flex',
  };
}

//// --------------------- helper functions ----------------------   ////
function injectComponentToHTML(
  webComponentTag: string,
  dom: Element = document.body,
) {
  if (dom) {
    let componentElement = dom.querySelector(webComponentTag);

    if (!componentElement) {
      componentElement = document.createElement(webComponentTag);
      dom.appendChild(componentElement);
    }
    return componentElement;
  }
  throw new Error('dom is empty!');
}

function injectMainScript() {
  // Load Angular's compiled scripts & Inject the Angular main.js script
  const angularScript = document.createElement('script');
  angularScript.type = 'module'; // Ensure it's treated as an ES module
  const moduleUrl = chrome.runtime.getURL('main.js');
  angularScript.src = moduleUrl;
  document.body.appendChild(angularScript);
}

// document.addEventListener("onload", injectIcons);
// window.onload = injectIcons;
