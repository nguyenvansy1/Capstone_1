import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Majors} from '../model/majors';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MajorsService {
  private URL_API = 'http://localhost:8080/api/user';
  constructor(private httpClient: HttpClient) { }


  getAllMajors(): Observable<Majors[]> {
    return this.httpClient.get<Majors[]>(`${this.URL_API}/majors`);
  }
}
