import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { TodoAddFormInstance } from '@vsh/app/common/todo-add-form';
import { environment } from '@vsh/app/env';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { TodosApi } from './todos.api';
import { todosActions } from './todos.state';

@Injectable()
export class TodosEffects implements OnInitEffects {

  // deps
  #actions$ = inject(Actions);
  #api = inject(TodosApi);
  #todoAddFormInstance = inject(TodoAddFormInstance);

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

  onAddResetAddForm$ = createEffect(() => this.#actions$.pipe(
    ofType(todosActions.addSuccess),
    tap(() => this.#todoAddFormInstance.reset())
  ), { dispatch: false });

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

  markAllComplete$ = createEffect(() => this.#actions$.pipe(
    ofType(todosActions.markAllComplete),
    switchMap(({ clientId }) => this.#api
      .markAllComplete$(clientId)
      .pipe(
        map(() => todosActions.markAllCompleteSuccess()),
        catchError(() => of(todosActions.markAllCompleteFail()))
      )
    )
  ));

  ngrxOnInitEffects() {
    return todosActions.init({ clientId: environment.clientId })
  }

}
