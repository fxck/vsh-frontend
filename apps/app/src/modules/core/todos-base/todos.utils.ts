import { TodoEntity } from './todos.model';

export const countTodos = (todos: TodoEntity[]) => todos.reduce(
  (acc, todo) => {
    todo.completed ? acc.completed++ : acc.active++;
    return acc;
  },
  { completed: 0, active: 0 }
);

export const incompleteTodos = (todos: TodoEntity[]) => todos.filter((todo) => !todo.completed);
