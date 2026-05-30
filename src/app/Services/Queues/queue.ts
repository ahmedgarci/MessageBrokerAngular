import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchService<T> {
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  fetch(endpoint:string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${endpoint}`);
  }



}
