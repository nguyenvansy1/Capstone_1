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
    return this.httpClient.post<Customer>(`${this.URL_API}/add`, customer);
  }

  getAllCustomer(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${this.URL_API}/list`);
  }

  getAllCustomerPage(thePage: number, thePageSize: number): Observable<GetResponseCustomer> {
    const url = `${this.URL_API}/listPage?` + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseCustomer>(url);
  }

  getCustomerByName(thePage: number, thePageSize: number, name: string): Observable<void> {
    const url = `${this.URL_API}/filter?` + `page=${thePage}&size=${thePageSize}&name=${name}`;
    return this.httpClient.get<void>(url);
  }
}

interface GetResponseCustomer {
  content: Customer[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
