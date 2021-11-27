import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './shared/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private httpClient: HttpClient) { }

  getTodos(): Observable<Item[]> {
    return this.httpClient.get<Item[]>("http://localhost:3000/items");
  }

  getItemsByListId(id: number): Observable<Item[]> {
    return this.httpClient.get<Item[]>("http://localhost:3000/items?list_Id=" + id);
  }

  addTodo(item: Item): Observable<Item> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient.post<Item>("http://localhost:3000/items", item, {headers: headers});
    }

  updateTodo(id: number, item: Item): Observable<Item> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", 'application/json; charset=utf-8');

    return this.httpClient.post<Item>("http://localhost:3000/items/" + id, item, {headers: headers});
  }

  deleteTodo(id: number): Observable<Item> {
    return this.httpClient.delete<Item>("http://localhost:3000/items/" + id)
  }
}
