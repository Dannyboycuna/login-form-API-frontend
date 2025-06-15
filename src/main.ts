import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core'; // ✅ Needed!

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [...(appConfig.providers || []), importProvidersFrom(HttpClientModule)] // ✅ FIXED
}).catch((err) => console.error(err));
