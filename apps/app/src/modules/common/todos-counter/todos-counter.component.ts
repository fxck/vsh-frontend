import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { countTodos, TodoEntity } from '../../core/todos-base';
import { CounterTodos } from '../../core/todos-base';

@Component({
  selector: 'vsh-todos-counter',
  templateUrl: './todos-counter.component.html',
  styleUrls: [ './todos-counter.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosCounterComponent {

  todoCount: CounterTodos = {
    completed: 0,
    active: 0
  };

  @Input()
  set todos(value: TodoEntity[]) {
    this.todoCount = countTodos(value);
  }

}
