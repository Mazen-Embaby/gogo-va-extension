// import { isProbablyReaderable, Readability } from '@mozilla/readability';

//// --------------------- Start Helper Functions ----------------------   ////
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

// Function to get specific styles
function getSpecificStyles(element: HTMLElement, properties: any[]) {
  const styleMap = new Map();
  if (!element || !(element instanceof HTMLElement)) {
    console.error('Invalid element provided');
    return styleMap;
  }

  const computedStyles = window.getComputedStyle(element);

  // Add only desired properties to the Map
  properties.forEach((property) => {
    if (computedStyles.getPropertyValue(property)) {
      styleMap.set(property, computedStyles.getPropertyValue(property));
    }
  });
  return styleMap;
}

// function canBeParsed(document: Document) {
//   return isProbablyReaderable(document, {
//     minContentLength: 100,
//   });
// }

// function parse(document: Document) {
//   if (!canBeParsed(document)) {
//     return false;
//   }
//   const documentClone = document.cloneNode(true) as Document;
//   const article = new Readability(documentClone).parse();
//   return article!.textContent;
// }

//////////////////  End Helper Functions //////////////////////

// Add the "check" icon to all text fields
function processOfTextField(inputElement: HTMLTextAreaElement): void {
  const textParent = inputElement.parentNode;
  const hightLight = document.createElement('gogova-text-checker');
  textParent?.insertBefore(hightLight, inputElement);
  hightLight.appendChild(inputElement);
}

// Function to update the last active input's attribute (e.g., value or style)
function updateLastActiveInput(value: string) {
  if (lastActiveInput) {
    // Update the specified attribute (e.g., value or style)
    console.log('UPDATE: ', value);
    // lastActiveInput.setAttribute(attribute, value);
    // if (elementAt.){}
  } else {
    console.log('No input element is currently active.');
  }
}

///////////////////////////////////////////////////////////////

console.debug('inject func');
let lastActiveInput: HTMLTextAreaElement | null;

injectMainScript();
const waComp = injectComponentToHTML('gogova-writing-assistance');

const setMarkerPosition = (markerPosition: {
  left?: string;
  top?: string;
  right?: string;
  bottom?: string;
  display: string;
  text: string;
}) => {
  waComp.setAttribute('markerPosition', JSON.stringify(markerPosition));
};

// Listen for messages from Angular to update the last active input
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'updateLastActiveInput' && lastActiveInput) {
    // lastActiveInput.setAttribute(request.attribute, request.value);
    updateLastActiveInput(request.value);
    sendResponse({ status: 'done' });
  } else {
    sendResponse({ status: 'no active input' });
  }
});


// Track when an input element is focused
document.addEventListener(
  'input',
  function (event) {
    // Check if the focused element is an input field (input, textarea, etc.)
    // const element =  (event.target as HTMLElement);

    var element = document.activeElement; // Get the currently focused element
    console.log('Element FOCUS.', element);
    console.log('Element TAGNAME.', element!.tagName);

    if (
      (element && element.tagName === 'INPUT') ||
      element!.tagName === 'TEXTAREA'
    ) {
      lastActiveInput = element as HTMLTextAreaElement; // Save the last active input element
    }
    setMarkerPosition({
      display: 'flex',
      right: '0px',
      bottom: '0px',
      text: lastActiveInput!.value,
    });
  },
  true,
); // Use capturing phase to ensure it works for all inputs

// document.addEventListener('input', () => {
//   const activeElement = document.activeElement;
//   if (activeElement){
//   const rect = activeElement!.getBoundingClientRect();
//   // const left = `${rect.left + rect.width  + 25}px`;
//   // const top = `${rect.top + 25}px`;
//   // setMarkerPosition({display: 'flex', left: left, top: top});

//   // setMarkerPosition({display: 'flex', right: '0px', bottom: '0px'});
//   }
// });

document.addEventListener('focusout', (event) => {
  // temp solution and need to enhanced
  var target = event.relatedTarget as EventTarget;
  const relatedElement = event.relatedTarget as HTMLElement | null;

  console.log('target', event);
  // console.log('target', target.eventListeners!.name);
  console.log(
    'relatedElement',
    relatedElement?.classList?.contains('tablinks'),
  );

  if (relatedElement?.classList?.contains('tablinks')) {
  } else {
    // setMarkerPosition({display: 'none', text:''});
  }
});

// const x = parse(window.document);
// console.log(`XX, ${x} `)

// document.addEventListener("onload", inject);
// window.onload = inject;
