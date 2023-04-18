import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  TodoAddPayload,
  TodoAddResponse,
  TodoEntity,
  TodoUpdatePayload,
  TodoUpdateResponse
} from './todos.model';
import { environment } from '@vsh/app/env';

@Injectable({ providedIn: 'root' })
export class TodosApi {

  #httpClient = inject(HttpClient);
  #apiUrl = `${environment.apiUrl}/todos`;

  add$(clientId: string, data: TodoAddPayload) {
    return this.#httpClient.post<TodoAddResponse>(
      this.#apiUrl,
      { ...data, clientId }
    );
  }

  update$(id: number, data: TodoUpdatePayload) {
    return this.#httpClient.put<TodoUpdateResponse>(
      `${this.#apiUrl}/${id}`,
      data
    );
  }

  delete$(id: number) {
    return this.#httpClient.delete(
      `${this.#apiUrl}/${id}`
    );
  }

  search$(clientId: string) {
    return this.#httpClient.get<TodoEntity[]>(
      `${this.#apiUrl}?clientId=${clientId}`
    );
  }

  markAllComplete$(clientId: string) {
    return this.#httpClient.patch<TodoUpdateResponse>(
      `${this.#apiUrl}/mark-all-as-completed?clientId=${clientId}`,
      {}
    );
  }

}
