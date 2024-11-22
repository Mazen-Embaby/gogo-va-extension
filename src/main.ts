import {
  bootstrapApplication,
  createApplication,
} from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import 'zone.js'; // Make sure Zone.js is imported here
import { SimpleComponent } from './app/components/simple/simple.component';
import { createCustomElement } from '@angular/elements';
import { FabComponent } from './app/components/fab/fab.component';
import { WriteAssistanceComponent } from './app/components/write-assistance/write-assistance.component';

createApplication()
  .then((app) => {
    const component = createCustomElement(SimpleComponent, {
      injector: app.injector,
    });
    customElements.define('gogova-simple', component);
  })
  .catch((err) => console.error(err));

  createApplication()
  .then((app) => {
    const component = createCustomElement(FabComponent, {
      injector: app.injector,
    });
    customElements.define('gogova-fab', component);
  })
  .catch((err) => console.error(err));

  createApplication()
  .then((app) => {
    const component = createCustomElement(WriteAssistanceComponent, {
      injector: app.injector,
    });
    customElements.define('gogova-write-assistance', component);
  })
  .catch((err) => console.error(err));

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
