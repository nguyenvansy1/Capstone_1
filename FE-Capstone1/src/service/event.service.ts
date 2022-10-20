import { Injectable } from '@angular/core';
import {Event} from '../model/event';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {EventUser} from '../model/event_user';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private URL_API = 'http://localhost:8080/api/event';
  constructor(private httpClient: HttpClient) { }

  getAllEvent(thePage: number, thePageSize: number): Observable<GetResponseEvent> {
    const url = `${this.URL_API}/list?` + `page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseEvent>(url);
  }

  updateEvent(event: Event): Observable<Event> {
    return this.httpClient.patch<Event>(`${this.URL_API}/update`, event);
  }

  addEvent1(event: Event): Observable<Event> {
    return this.httpClient.post<Event>(`${this.URL_API}/add`, event);
  }

  getDataEvent(): Observable<number[]> {
    return this.httpClient.get<number[]>(`${this.URL_API}/dataEvent`);
  }

  getAmountEventFinished(): Observable<number> {
    return this.httpClient.get<number>(`${this.URL_API}/dataEventFinished`);
  }

  getAmountEventUpcoming(): Observable<number> {
    return this.httpClient.get<number>(`${this.URL_API}/dataEventUpcoming`);
  }

  getEventByUser(code: number , thePage: number, thePageSize: number): Observable<GetResponseEventUser> {
    const url = `${this.URL_API}/eventByUser?` + `code=${code}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseEventUser>(url);
  }

  getUserByEvent(id: number , thePage: number, thePageSize: number): Observable<GetResponseEventUser> {
    const url = `${this.URL_API}/userByEvent?` + `id=${id}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseEventUser>(url);
  }

  findEventById(id: number): Observable<Event> {
    return this.httpClient.get<Event>(`${this.URL_API}/find/${id}`);
  }

  getExcel(id: number): Observable<Blob> {
    // @ts-ignore
    return this.httpClient.post<Blob>(`${this.URL_API}/excel` , id, {responseType: 'blob'} );
  }
}

interface GetResponseEvent {
  content: Event[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

interface GetResponseEventUser {
  content: EventUser[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
