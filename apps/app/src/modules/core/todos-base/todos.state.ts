import {
  createActionGroup,
  createFeature,
  createReducer,
  emptyProps,
  on,
  props
} from '@ngrx/store';
import {
  FEATURE_NAME,
  TodoAddPayload,
  TodoAddResponse,
  TodoEntity,
  TodosState,
  TodoUpdatePayload,
  TodoUpdateResponse
} from './todos.model';

const initialState: TodosState = {
  data: []
};

export const todosActions = createActionGroup({
  source: FEATURE_NAME,
  events: {
    'init': props<{ clientId: string; }>(),

    'add': props<{ clientId: string; payload: TodoAddPayload; }>(),
    'add success': props<{ data: TodoAddResponse; }>(),
    'add fail': emptyProps(),

    'update': props<{ id: number, payload: TodoUpdatePayload; }>(),
    'update success': props<{ data: TodoUpdateResponse; }>(),
    'update fail': emptyProps(),

    'delete': props<{ id: number }>(),
    'delete success': props<{ id: number }>(),
    'delete fail': emptyProps(),

    'search': props<{ clientId: string; }>(),
    'search success': props<{ data: TodoEntity[]; }>(),
    'search fail': emptyProps(),

    'mark all complete': props<{ clientId: string; }>(),
    'mark all complete success': emptyProps(),
    'mark all complete fail': emptyProps(),
  }
})

export const todosState = createFeature({
  name: FEATURE_NAME,
  reducer: createReducer(
    initialState,
    on(todosActions.searchSuccess, (state, { data }) => ({
      ...state,
      data
    })),
    on(todosActions.addSuccess, (state, { data }) => ({
      ...state,
      data: [ ...state.data, data ]
    })),
    on(todosActions.updateSuccess, (state, { data }) => ({
      ...state,
      data: state.data.map((todo) => {
        if (todo.id !== data.id) { return todo; }
        return { ...todo, ...data };
      })
    })),
    on(todosActions.deleteSuccess, (state, { id }) => ({
      ...state,
      data: state.data.filter((todo) => todo.id !== id)
    })),
    on(todosActions.markAllCompleteSuccess, (state) => ({
      ...state,
      data: state.data.map((todo) => ({ ...todo, completed: true }))
    }))
  )
});

