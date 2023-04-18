import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '@vsh/app/env';
import { AppComponent } from '@vsh/app/app';
import { TodosBaseModule } from '@vsh/app/core/todos-base';

bootstrapApplication(
  AppComponent,
  {
    providers: [
      importProvidersFrom(
        BrowserAnimationsModule,
        TodosBaseModule,
        EffectsModule.forRoot(),
        StoreModule.forRoot()
      ),
      provideHttpClient(),
      provideStoreDevtools({
        maxAge: 25,
        logOnly: !environment.production
      })
    ]
  }
).catch((err) => console.error(err));
