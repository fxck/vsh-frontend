import { Component } from '@angular/core';
import { TodosFeature } from '@vsh/app/features/todos';

@Component({
  selector: 'vsh-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  standalone: true,
  imports: [ TodosFeature ]
})
export class AppComponent {

}
