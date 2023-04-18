import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TodosEffects } from './todos.effects';
import { todosState } from './todos.state';

@NgModule({
  imports: [
    EffectsModule.forFeature([ TodosEffects ]),
    StoreModule.forFeature(todosState)
  ]
})
export class TodosBaseModule {

}
