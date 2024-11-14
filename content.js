// Add the "check" icon to all text fields
function addCheckIconToTextField(inputElement) {
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
    });

    // Wrap input field in a container
    const wrapper = document.createElement("div");
    wrapper.className = "grammar-check-wrapper";
    wrapper.style.position = "relative";
    inputElement.parentNode.insertBefore(wrapper, inputElement);
    wrapper.appendChild(inputElement);
    wrapper.appendChild(icon);
}

// Check grammar using gemini 
async function checkGrammar(inputElement) {
    console.debug('checkGrammar func');

    const text = inputElement.value;

    
}

// Show suggestions in a popup near the text field
function showSuggestions(inputElement, matches) {
    const popup = document.createElement("div");
    popup.className = "suggestions-popup";

    matches.forEach(match => {
        const suggestion = document.createElement("div");
        suggestion.className = "suggestion";
        suggestion.innerText = `${match.message} - Suggested: ${match.replacements.map(rep => rep.value).join(", ")}`;
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
function injectIcons() {
    console.debug('inject func');
    const textFields = document.querySelectorAll("input[type='text'], textarea");
    textFields.forEach(addCheckIconToTextField);
}

document.addEventListener("DOMContentLoaded", injectIcons());
