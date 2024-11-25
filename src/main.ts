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
import { TextCheckerComponent } from './app/components/text-checker/text-checker.component';

createApplication()
  .then((app) => {
    const simpleComponent = createCustomElement(SimpleComponent, {
      injector: app.injector,
    });
    customElements.define('gogova-simple', simpleComponent);

    const fabComponent = createCustomElement(FabComponent, {
      injector: app.injector,
    });
    customElements.define('gogova-fab', fabComponent);

    const writeAssistanceComponent = createCustomElement(WriteAssistanceComponent, {
      injector: app.injector,
    });
    customElements.define('gogova-write-assistance', writeAssistanceComponent);

    const textCheckerComponent = createCustomElement(TextCheckerComponent, {
      injector: app.injector,
    });
    customElements.define('gogova-text-checker', textCheckerComponent);

  })
  .catch((err) => console.error(err));

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
