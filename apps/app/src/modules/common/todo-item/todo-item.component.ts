import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoEntity, TodoUpdatePayload } from '@vsh/app/features/todos/todos.model';

@Component({
  selector: 'vsh-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: [ './todo-item.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule
  ]
})
export class TodoItemComponent {

  form = new FormGroup(
    {
      text: new FormControl<string>('', {
        validators: [ Validators.required ],
        nonNullable: true
      }),
      completed: new FormControl<boolean>(
        false,
        {
          nonNullable: true
        }
      )
    }
  );

  @Input()
  set data(value) {
    if (!value) { return; }

    this.form.setValue({
      completed: value.completed,
      text: value.text
    });

    this.#data = value;
  }
  get data() {
    return this.#data;
  }
  #data!: TodoEntity;

  @Output()
  delete = new EventEmitter<number>();

  @Output()
  update = new EventEmitter<{ id: number; data: TodoUpdatePayload; }>();


}
