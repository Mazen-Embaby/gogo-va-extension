

// Add the "check" icon to all text fields
function processOfTextField(inputElement: HTMLTextAreaElement): void {
    const textParent = inputElement.parentNode;
    const hightLight = document.createElement('gogova-text-checker');
    textParent?.insertBefore(hightLight, inputElement);
    hightLight.appendChild(inputElement);
  }
  
  
  // Inject icons into all text fields on the page
  async function inject(): Promise<void> {
    console.debug('inject func');
    injectMainScript();
    // injectComponentToHTML('gogova-fab');
  
    // const textFields = document.querySelectorAll('textarea');
  
    // textFields.forEach((textField) =>
    //   processOfTextField(textField as HTMLTextAreaElement),
    // );
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
  
  document.addEventListener("onload", inject);
  window.onload = inject;
  