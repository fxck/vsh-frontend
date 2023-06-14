import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { TodoEntity, TodoUpdatePayload } from '@vsh/app/core/todos-base';
import { TodoItemComponent } from '../todo-item';

@Component({
  selector: 'vsh-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: [ './todos-list.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgFor,
    TodoItemComponent
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
