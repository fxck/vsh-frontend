import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { select, Store } from '@ngrx/store';
import {
  combineLatest,
  map,
  merge,
  Subject
} from 'rxjs';
import { environment } from '@vsh/app/env';
import { TodoAddFormComponent } from '@vsh/app/common/todo-add-form';
import {
  TodoAddPayload,
  TodoUpdatePayload,
  todosActions,
  todosState,
  incompleteTodos
} from '@vsh/app/core/todos-base';
import { TodosActionsComponent } from '@vsh/app/common/todos-actions';
import { TodosListComponent } from '@vsh/app/common/todos-list';
import { TodosCounterComponent } from '@vsh/app/common/todos-counter';

@Component({
  selector: 'vsh-todos',
  templateUrl: './todos.feature.html',
  styleUrls: [ './todos.feature.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    TodoAddFormComponent,
    MatCardModule,
    TodosActionsComponent,
    TodosListComponent,
    TodosCounterComponent
  ]
})
export class TodosFeature {

  // deps
  #store = inject(Store);

  // event streams
  onAdd$ = new Subject<{ data: TodoAddPayload }>();
  onUpdate$ = new Subject<{ id: number, data: TodoUpdatePayload; }>();
  onDelete$ = new Subject<number>();
  onMarkAllComplete$ = new Subject<void>();

  // data
  hideCompletedSignal = signal(false);
  todos$ = this.#store.pipe(select(todosState.selectData));
  visibleTodos$ = combineLatest([
    toObservable(this.hideCompletedSignal),
    this.todos$
  ]).pipe(map(([ hide, todos ]) => hide ? incompleteTodos(todos) : todos));

  #clientId = environment.clientId;

  // action streams
  #addAction$ = this.onAdd$.pipe(
    map(({ data }) => todosActions.add({
      payload: data,
      clientId: this.#clientId
    }))
  );
  #updateAction$ = this.onUpdate$.pipe(
    map(({ id, data }) => todosActions.update({ id, payload: data }))
  );
  #deleteAction$ = this.onDelete$.pipe(
    map((id) => todosActions.delete({ id }))
  );
  #markAllCompleteAction$ = this.onMarkAllComplete$.pipe(
    map(() => todosActions.markAllComplete({ clientId: this.#clientId }))
  );

  constructor() {
    merge(
      this.#addAction$,
      this.#updateAction$,
      this.#deleteAction$,
      this.#markAllCompleteAction$
    )
      .pipe(takeUntilDestroyed())
      .subscribe(this.#store);
  }

}
