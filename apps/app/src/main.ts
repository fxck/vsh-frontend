import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '@vsh/app/app';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { environment } from '@vsh/app/env';
import { TodosEffects } from '@vsh/app/features/todos';
import { provideHttpClient } from '@angular/common/http';
import { todosState } from './modules/features/todos/todos.state';

bootstrapApplication(
  AppComponent,
  {
    providers: [
      importProvidersFrom(BrowserAnimationsModule),
      provideHttpClient(),
      provideStore(),
      provideState(todosState),
      provideEffects(TodosEffects),
      provideStoreDevtools({
        maxAge: 25,
        logOnly: !environment.production
      })
    ]
  }
).catch((err) => console.error(err));
