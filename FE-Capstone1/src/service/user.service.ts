import { Injectable } from '@angular/core';
import {User} from '../model/user';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL_API = 'http://localhost:8080/api/user';
  constructor(private httpClient: HttpClient) { }

  getAllUser(thePage: number, thePageSize: number): Observable<GetResponseUser> {
    const url = `${this.URL_API}/list?` + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseUser>(url);
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.patch<User>(`${this.URL_API}/update`, user);
  }

  deleteCustomer(code: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.URL_API}/delete/${code}`);
  }

  getUserByName(thePage: number, thePageSize: number, name: string): Observable<GetResponseUser> {
    const url = `${this.URL_API}/searchName?` + `name=${name}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseUser>(url);
  }

  getUserByCode(thePage: number, thePageSize: number, code: string): Observable<GetResponseUser> {
    const url = `${this.URL_API}/searchCode?` + `code=${code}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseUser>(url);
  }

  getUserByCodeOrName(thePage: number, thePageSize: number, name: string): Observable<GetResponseUser> {
    const url = `${this.URL_API}/filter?` + `page=${thePage}&size=${thePageSize}&name=${name}`;
    return this.httpClient.get<GetResponseUser>(url);
  }

  findUserByCode(code: number): Observable<User> {
    return this.httpClient.get<User>(`${this.URL_API}/find/${code}`);
  }

  getDataUser(): Observable<number[]> {
    return this.httpClient.get<number[]>(`${this.URL_API}/dataUser`);
  }
}

interface GetResponseUser {
  content: User[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
