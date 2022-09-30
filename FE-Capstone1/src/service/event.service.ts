import { Injectable } from '@angular/core';
import {Event} from '../model/event';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private URL_API = 'http://localhost:8080/api/event';
  constructor(private httpClient: HttpClient) { }

  getAllEvent(thePage: number, thePageSize: number): Observable<GetResponseEvent> {
    const url = `${this.URL_API}/list?` + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseEvent>(url);
  }

  updateEvent(event: Event): Observable<Event> {
    return this.httpClient.patch<Event>(`${this.URL_API}/update`, event);
  }

  addEvent1(event: Event): Observable<Event> {
    return this.httpClient.post<Event>(`${this.URL_API}/add`, event);
  }
}

interface GetResponseEvent {
  content: Event[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
