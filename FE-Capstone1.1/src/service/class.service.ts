import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Course} from '../model/course';
import {Class} from '../model/class';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private URL_API = 'http://localhost:8080/api/user';
  constructor(private httpClient: HttpClient) { }

  getAllClass(): Observable<Class[]> {
    return this.httpClient.get<Class[]>(`${this.URL_API}/class`);
  }
}
