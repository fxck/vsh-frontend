import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { environment } from '@vsh/app/env';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { TodosApi } from './todos.api';
import { todosActions } from './todos.state';

@Injectable()
export class TodosEffects implements OnInitEffects {

  // deps
  #actions$ = inject(Actions);
  #api = inject(TodosApi);

  // effects
  searchOnInit$ = createEffect(() => this.#actions$.pipe(
    ofType(todosActions.init),
    switchMap(({ clientId }) => this.#api
      .search$(clientId)
      .pipe(
        map((data) => todosActions.searchSuccess({ data })),
        catchError(() => of(todosActions.searchFail()))
      )
    )
  ));

  add$ = createEffect(() => this.#actions$.pipe(
    ofType(todosActions.add),
    switchMap(({ payload, clientId }) => this.#api
      .add$(clientId, payload)
      .pipe(
        map((data) => todosActions.addSuccess({ data })),
        catchError(() => of(todosActions.addFail()))
      )
    )
  ));

  update$ = createEffect(() => this.#actions$.pipe(
    ofType(todosActions.update),
    switchMap(({ id, payload }) => this.#api
      .update$(id, payload)
      .pipe(
        map((data) => todosActions.updateSuccess({ data })),
        catchError(() => of(todosActions.updateFail()))
      )
    )
  ));

  delete$ = createEffect(() => this.#actions$.pipe(
    ofType(todosActions.delete),
    mergeMap(({ id }) => this.#api
      .delete$(id)
      .pipe(
        map(() => todosActions.deleteSuccess({ id })),
        catchError(() => of(todosActions.updateFail()))
      )
    )
  ));

  ngrxOnInitEffects() {
    return todosActions.init({ clientId: environment.clientId })
  }

}
