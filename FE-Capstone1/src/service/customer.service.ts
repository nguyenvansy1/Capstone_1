import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {Customer} from '../model/customer';
import {Majors} from '../model/majors';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private URL_API = 'http://localhost:8080/api/customer';
  constructor(private httpClient: HttpClient) {
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.post<User>(`${this.URL_API}/add`, customer);
  }

  getAllCustomer(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${this.URL_API}/list`);
  }
}
