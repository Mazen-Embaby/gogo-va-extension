// Display suggestions in the popup if needed for further analysis
chrome.storage.sync.get("suggestions", data => {
    const suggestionsContainer = document.getElementById("suggestions");
    data.suggestions.forEach(suggestion => {
        const div = document.createElement("div");
        div.innerText = suggestion;
        suggestionsContainer.appendChild(div);
    });
});
