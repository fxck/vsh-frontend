import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { TodoEntity, TodoUpdatePayload } from '../../core/todos-base';
import { TodoItemComponent } from '../todo-item';
import { TodosCounterComponent } from '../todos-counter';

@Component({
  selector: 'vsh-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: [ './todos-list.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgFor,
    TodoItemComponent,
    TodosCounterComponent
  ]
})
export class TodosListComponent {

  @Input()
  todos: TodoEntity[] = [];

  @Output()
  deleteItem = new EventEmitter<number>();

  @Output()
  updateItem = new EventEmitter<{ id: number; data: TodoUpdatePayload; }>();

  trackById(_: number, item: TodoEntity) {
    return item.id;
  }
}
