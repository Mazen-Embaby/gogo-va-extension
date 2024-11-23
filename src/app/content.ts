// Function to replace text in the active input field.
function replaceText(
  inputElement: HTMLInputElement | HTMLTextAreaElement,
  correctedText: string,
): void {
  // Get the active element
  const activeElement = inputElement;

  // Check if the active element is a text input or textarea
  if (
    activeElement &&
    (activeElement.tagName.toLowerCase() === 'input' ||
      activeElement.tagName.toLowerCase() === 'textarea')
  ) {
    activeElement.value = correctedText;
  }
}

// Add the "check" icon to all text fields
function processOfTextField(inputElement: HTMLTextAreaElement): void {
  const textParent = inputElement.parentNode;
  const hightLight = document.createElement('gogova-highlight');
  textParent?.insertBefore(hightLight, inputElement);
  hightLight.appendChild(inputElement);
}

// Function to handle input events in text areas
function handleTyping(event: Event): void {
  const target = event.target as HTMLTextAreaElement;
  const textContent = target.value;
  console.log('User type:', textContent);

  // Optional: Trigger grammar check or other actions
  // checkGrammar(target);
}

// Check grammar using gemini
async function checkGrammar(inputElement: HTMLTextAreaElement): Promise<void> {
  const text = inputElement.value;
  console.debug(`checkGrammar func ${text}`);
}

// Show suggestions in a popup near the text field
function showSuggestions(
  inputElement: HTMLTextAreaElement,
  matches: Array<{ message: string; replacements: { value: string }[] }>,
): void {
  const popup = document.createElement('div');
  popup.className = 'suggestions-popup';

  matches.forEach((match) => {
    const suggestion = document.createElement('div');
    suggestion.className = 'suggestion';
    suggestion.innerText = `${match.message} - Suggested: ${match.replacements
      .map((rep) => rep.value)
      .join(', ')}`;
    popup.appendChild(suggestion);
  });

  document.body.appendChild(popup);

  // Position the popup near the input
  const rect = inputElement.getBoundingClientRect();
  popup.style.position = 'absolute';
  popup.style.left = `${rect.left}px`;
  popup.style.top = `${rect.bottom + window.scrollY}px`;
}

// Inject icons into all text fields on the page
async function injectIcons(): Promise<void> {
  console.debug('inject func');
  injectMainScript();
  injectComponentToHTML('gogova-fab');

  const textFields = document.querySelectorAll('textarea');

  textFields.forEach((textField) =>
    processOfTextField(textField as HTMLTextAreaElement),
  );
}

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
  }
}

function injectMainScript() {
  // Load Angular's compiled scripts & Inject the Angular main.js script
  const angularScript = document.createElement('script');
  angularScript.type = 'module'; // Ensure it's treated as an ES module
  const moduleUrl = chrome.runtime.getURL('main.js');
  angularScript.src = moduleUrl;
  // await import(moduleUrl); // Dynamically import the module
  document.body.appendChild(angularScript);
}

function requestFocus(activeElement: HTMLElement): void {
  // Check if the active element is a text input or textarea
  if (activeElement && activeElement.tagName.toLowerCase() === 'textarea') {
    (activeElement as HTMLTextAreaElement).value = 'correctedText';
  }
}

// document.addEventListener("onload", injectIcons);
window.onload = injectIcons;
