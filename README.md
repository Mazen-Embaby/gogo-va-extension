# GogoVA Chrome Extension 🚀



## Inspiration

GoGo VA is a chrome-extension was born out of the need for a tool that simplifies writing tasks while offering the power of advanced AI models. We wanted to create an AI assistant that works entirely offline, giving users privacy and efficiency, all without the need for an internet connection.

## What it does

GoGo VA revolutionizes the writing experience by offering powerful tools for prompt generation, translation, summarization, and more. Whether you're brainstorming ideas, translating text, or summarizing long documents, GoGo VA is designed to help you get your work done faster and more effectively—all from the comfort of your own device.

## Key Features
- 🛠️ **Vite**: for lightning-fast development and hot module replacement.

- 🧰 **TypeScript**: for type safety and enhanced productivity.

- ⚛️ **angular**: for building dynamic and interactive UI components.

- 📦 **CRX**: custom element

- 🎨 **Tailwind CSS**: for hassle-free styling, including seamless integration in content scripts.

  🎨 **Angular Material**: for hassle-free styling, including seamless integration in content scripts.


## Requirements

🚍 Google Chrome Canary

🔧 Enable & Download built-in chrome AI API [ prompt, summarize,  ]

## Usage Instructions

1. 📥 Clone the repository.
2. 🔧 Install dependencies with `npm install`.
3. 🚀 build the extension with `npm run build:extension`.
4. 🏗️ In chrome select manage extension then load unpacked then the directory build.

## Development & Contribution

#### Inject component Angular 18

1. To inject an angular component register it first as a web component in `main.ts`

     ```typescript
     createApplication()
       .then((app) => {
         const component = createCustomElement(SimpleComponent, {
           injector: app.injector,
         });
         customElements.define('app-simple', component);
       })
       .catch((err) => console.error(err));
     
     bootstrapApplication(AppComponent, appConfig).catch((err) =>
       console.error(err),
     );
     ```

     

2. Inject the registered component through the code below 

     ```typescript
       const webComponentTag = 'app-simple';
     
       let componentElement = document.querySelector(webComponentTag);
     
       if (!componentElement) {
         componentElement = document.createElement(webComponentTag);
         componentElement.id = 'angular-chrome-app';
         document.body.appendChild(componentElement);
     
         // Load Angular's compiled scripts & Inject the Angular main.js script
         const angularScript = document.createElement('script');
         angularScript.type = 'module'; // Ensure it's treated as an ES module
         const moduleUrl = chrome.runtime.getURL('main.js');
         angularScript.src = moduleUrl;
         document.body.appendChild(angularScript);
       }
     ```

## Enhancement To Do
- [ ] custom webpack build on watch to serve
- [ ] text-checker:
  - [ ] sync the scroll of textarea to text-checker
  - [ ] click to the propose (suggestion) visible the cursor
