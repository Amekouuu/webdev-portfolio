import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';

import { App } from './app/app';
import { config } from './app/app.config.server';

// Angular 21 requires the BootstrapContext on the server; omitting it fails
// route extraction with NG0401 (Missing Platform).
const bootstrap = (context: BootstrapContext) => bootstrapApplication(App, config, context);

export default bootstrap;
