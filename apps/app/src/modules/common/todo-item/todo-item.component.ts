import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  TodoEntity,
  TodoUpdatePayload
 } from '../../core/todos-base';

@Component({
  selector: 'vsh-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: [ './todo-item.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
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
        { nonNullable: true }
      )
    }
  );

  @Input()
  set data(value: TodoEntity) {
    if (!value) { return; }

    this.form.setValue({
      completed: value.completed,
      text: value.text
    });
  }

  @Output()
  delete = new EventEmitter<void>();

  @Output()
  update = new EventEmitter<TodoUpdatePayload>();

}
