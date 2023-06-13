import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'vsh-todos-actions',
  templateUrl: './todos-actions.component.html',
  styleUrls: [ './todos-actions.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class TodosActionsComponent {

  @Input()
  hideCompletedState = false;

  @Output()
  markAllComplete = new EventEmitter<void>();

  @Output()
  toggleCompleted = new EventEmitter<boolean>();

}
