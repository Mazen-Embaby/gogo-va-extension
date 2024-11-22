# GogoVa

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.



## Development

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

  
