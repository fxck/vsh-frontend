import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () => import('../features/+todos').then((m) => m.TodosFeature)
  }
];
