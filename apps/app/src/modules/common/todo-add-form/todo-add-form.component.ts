import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { TodoAddPayload } from '@vsh/app/core/todos-base';
import { TodoAddFormInstance } from './todo-add-form.form';

@Component({
  selector: 'vsh-todo-add-form',
  templateUrl: './todo-add-form.component.html',
  styleUrls: [ './todo-add-form.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule
  ]
})
export class TodoAddFormComponent {

  form = inject(TodoAddFormInstance).getInstance();

  @Output()
  add = new EventEmitter<{ data: TodoAddPayload; }>();

}
