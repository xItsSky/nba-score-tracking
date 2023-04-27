import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { KeyInterceptor } from '@nba-score-tracking/core/interceptor/key.interceptor';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

registerLocaleData(en);

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([KeyInterceptor])),
    provideAnimations(),
    provideRouter(APP_ROUTES),
    { provide: NZ_I18N, useValue: en_US },
  ],
}).catch(console.error);
