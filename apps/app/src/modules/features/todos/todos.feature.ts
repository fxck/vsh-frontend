import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LetModule } from '@ngrx/component';
import { map, merge, Subject, takeUntil } from 'rxjs';
import { getObservableLifecycle } from 'ngx-observable-lifecycle';
import { todosActions, todosState } from './todos.state';
import { environment } from '@vsh/app/env';
import { TodoItemComponent } from '@vsh/app/common/todo-item';
import { NgFor } from '@angular/common';
import { TodoAddPayload, TodoUpdatePayload } from './todos.model';
import { TodoAddFormComponent } from '@vsh/app/common/todo-add-form';

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
    TodoAddFormComponent
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
  todos$ = this.#store.pipe(select(todosState.selectData));

  // action  streams
  #addAction$ = this.onAdd$.pipe(
    map(({ data }) => todosActions.add({
      payload: data,
      clientId: environment.clientId
    }))
  );
  #updateAction$ = this.onUpdate$.pipe(
    map(({ id, data }) => todosActions.update({ id, payload: data }))
  );
  #deleteAction$ = this.onDelete$.pipe(
    map((id) => todosActions.delete({ id }))
  );

  constructor() {
    merge(
      this.#addAction$,
      this.#updateAction$,
      this.#deleteAction$
    ).pipe(
      takeUntil(getObservableLifecycle(this).ngOnDestroy)
    ).subscribe(this.#store);
  }
}
