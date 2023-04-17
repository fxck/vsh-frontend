import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { TodoAddPayload } from '@vsh/app/features/todos';

@Component({
  selector: 'vsh-todo-add-form',
  templateUrl: './todo-add-form.component.html',
  styleUrls: [ './todo-add-form.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule
  ]
})
export class TodoAddFormComponent {

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

  @Output()
  add = new EventEmitter<{ data: TodoAddPayload; }>();

}
