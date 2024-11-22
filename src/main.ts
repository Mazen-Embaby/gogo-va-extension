import {
  bootstrapApplication,
  createApplication,
} from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import 'zone.js'; // Make sure Zone.js is imported here
import { SimpleComponent } from './app/components/simple/simple.component';
import { createCustomElement } from '@angular/elements';

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
