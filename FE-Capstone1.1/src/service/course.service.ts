import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Course} from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private URL_API = 'http://localhost:8080/api/user';

  constructor(private httpClient: HttpClient) {
  }
  getAllCourse(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(`${this.URL_API}/course`);
  }
}
