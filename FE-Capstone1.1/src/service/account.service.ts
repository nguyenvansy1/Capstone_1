import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Password} from '../model/password';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private URL_API = 'http://localhost:8080/api/account';
  constructor(private httpClient: HttpClient) { }

  public updatePassword(accountId: number, password: Password): Observable<void> {
    return this.httpClient.patch<void>(`${this.URL_API}/update/password/${accountId}`, {password}, httpOptions);
  }

  resetPassword(username: string): Observable<any> {
    return this.httpClient.post(`${this.URL_API}/reset-password`, {username}, httpOptions);
  }

  verifyPassword(code: string): Observable<any> {
    return this.httpClient.post(`${this.URL_API}/verify-password` , {code}, httpOptions);
  }

  doResetPassword(password: string, code: string): Observable<any> {
    return this.httpClient.post(`${this.URL_API}/do-forget-password`, {
      password,
      code
    }, httpOptions);
  }
}
