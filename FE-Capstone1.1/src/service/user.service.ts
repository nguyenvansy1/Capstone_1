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

  updateUser(user: User): Observable<ResponseMessage> {
    return this.httpClient.patch<ResponseMessage>(`${this.URL_API}/update`, user);
  }

  blockUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.URL_API}/block/${id}`);
  }

  unBlockUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.URL_API}/unblock/${id}`);
  }

  updateAvatar(avatar: string, code: number): Observable<void> {
    return this.httpClient.get<void>(`${this.URL_API}/updateAvatar?` + `&avatar=${avatar}&code=${code}`);
  }

  getUserByCodeOrName(thePage: number, thePageSize: number, name: string): Observable<void> {
    const url = `${this.URL_API}/filter?` + `page=${thePage}&size=${thePageSize}&name=${name}`;
    return this.httpClient.get<void>(url);
  }

  findUserByCode(code: number): Observable<User> {
    return this.httpClient.get<User>(`${this.URL_API}/find/${code}`);
  }

  getDataUser(): Observable<number[]> {
    return this.httpClient.get<number[]>(`${this.URL_API}/dataUser`);
  }

  getAmountUser(): Observable<number> {
    return this.httpClient.get<number>(`${this.URL_API}/amountUser`);
  }
}

interface GetResponseUser {
  content: User[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

interface ResponseMessage {
  message: string;
}
