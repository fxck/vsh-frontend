import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { select, Store } from '@ngrx/store';
import { LetModule } from '@ngrx/component';
import { BehaviorSubject, combineLatest, map, merge, Subject, takeUntil } from 'rxjs';
import { getObservableLifecycle } from 'ngx-observable-lifecycle';
import { environment } from '@vsh/app/env';
import { TodoItemComponent } from '@vsh/app/common/todo-item';
import { TodoAddFormComponent } from '@vsh/app/common/todo-add-form';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  TodoAddPayload,
  TodoUpdatePayload,
  todosActions,
  todosState
} from '@vsh/app/core/todos-base';
import { countTodos, incompleteTodos } from '@vsh/app/core/todos-base/todos.utils';

@Component({
  selector: 'vsh-todos',
  templateUrl: './todos.feature.html',
  styleUrls: [ './todos.feature.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LetModule,
    NgFor,
    TodoItemComponent,
    TodoAddFormComponent,
    MatCardModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule
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
  clientId = environment.clientId;
  hideCompleted$ = new BehaviorSubject<boolean>(false);
  todos$ = this.#store.pipe(select(todosState.selectData));
  visibleTodos$ = combineLatest([
    this.hideCompleted$,
    this.todos$
  ]).pipe(
    map(([ hideCompleted, todos ]) => {
      if (!hideCompleted) { return todos; }
      return incompleteTodos(todos);
    })
  );
  todosCount$ = this.todos$.pipe(map((todos) => countTodos(todos)));

  // action  streams
  #addAction$ = this.onAdd$.pipe(
    map(({ data }) => todosActions.add({
      payload: data,
      clientId: this.clientId
    }))
  );
  #updateAction$ = this.onUpdate$.pipe(
    map(({ id, data }) => todosActions.update({ id, payload: data }))
  );
  #deleteAction$ = this.onDelete$.pipe(
    map((id) => todosActions.delete({ id }))
  );
  #markAllCompleteAction$ = this.onMarkAllComplete$.pipe(
    map(() => todosActions.markAllComplete({ clientId: this.clientId }))
  );

  constructor() {
    merge(
      this.#addAction$,
      this.#updateAction$,
      this.#deleteAction$,
      this.#markAllCompleteAction$
    ).pipe(
      takeUntil(getObservableLifecycle(this).ngOnDestroy)
    ).subscribe(this.#store);
  }
}
