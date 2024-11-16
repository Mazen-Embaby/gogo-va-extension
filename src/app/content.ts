// Function to replace text in the active input field.
function replaceText(inputElement: HTMLInputElement | HTMLTextAreaElement, correctedText: string): void {
  // Get the active element
  const activeElement = inputElement;

  // Check if the active element is a text input or textarea
  if (
    activeElement &&
    (activeElement.tagName.toLowerCase() === "input" ||
      activeElement.tagName.toLowerCase() === "textarea")
  ) {
    activeElement.value = correctedText;
  }
}

// Add the "check" icon to all text fields
function processOfTextField(inputElement: HTMLTextAreaElement): void {
  // Event listener for input change
  inputElement.addEventListener("input", handleTyping);
  addIcon(inputElement);
}

function addIcon(inputElement: HTMLTextAreaElement): void {
  const icon = document.createElement("span");
  icon.className = "grammar-check-icon";
  // icon.innerText = "✓";
  icon.innerText = "✍️"; // You can also use an image or SVG

  icon.style.cursor = "pointer";

  // Position the icon
  icon.style.position = "absolute";
  icon.style.right = "5px";
  icon.style.top = "50%";
  icon.style.transform = "translateY(-50%)";

  // Event listener for icon click
  icon.addEventListener("click", () => {
    checkGrammar(inputElement);
    replaceText(inputElement, "changed to this");
  });

  // Wrap input field in a container
  const wrapper = document.createElement("div");
  wrapper.className = "grammar-check-wrapper";
  wrapper.style.position = "relative";

  const parent = inputElement.parentNode;
  if (parent) {
    parent.insertBefore(wrapper, inputElement);
    wrapper.appendChild(inputElement);
    wrapper.appendChild(icon);
  }
}

// Function to handle input events in text areas
function handleTyping(event: Event): void {
  const target = event.target as HTMLTextAreaElement;
  const textContent = target.value;
  console.log("User type:", textContent);

  // Optional: Trigger grammar check or other actions
  // checkGrammar(target);
}

// Check grammar using gemini
async function checkGrammar(inputElement: HTMLTextAreaElement): Promise<void> {
  const text = inputElement.value;
  console.debug(`checkGrammar func ${text}`);
}

// Show suggestions in a popup near the text field
function showSuggestions(inputElement: HTMLTextAreaElement, matches: Array<{ message: string; replacements: { value: string }[] }>): void {
  const popup = document.createElement("div");
  popup.className = "suggestions-popup";

  matches.forEach((match) => {
    const suggestion = document.createElement("div");
    suggestion.className = "suggestion";
    suggestion.innerText = `${match.message} - Suggested: ${match.replacements
      .map((rep) => rep.value)
      .join(", ")}`;
    popup.appendChild(suggestion);
  });

  document.body.appendChild(popup);

  // Position the popup near the input
  const rect = inputElement.getBoundingClientRect();
  popup.style.position = "absolute";
  popup.style.left = `${rect.left}px`;
  popup.style.top = `${rect.bottom + window.scrollY}px`;
}

// Inject icons into all text fields on the page
function injectIcons(): void {
  console.debug("inject funcc");
  const textFields = document.querySelectorAll("textarea");

  textFields.forEach((textField) => processOfTextField(textField as HTMLTextAreaElement));
}

function requestFocus(activeElement: HTMLElement): void {
  // Check if the active element is a text input or textarea
  if (activeElement && activeElement.tagName.toLowerCase() === "textarea") {
    (activeElement as HTMLTextAreaElement).value = "correctedText";
  }
}

// document.addEventListener("onload", injectIcons);
window.onload = injectIcons;

// document.addEventListener("focusin", injectIcons);
