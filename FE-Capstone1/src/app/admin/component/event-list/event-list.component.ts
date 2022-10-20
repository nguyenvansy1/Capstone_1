import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../../../service/customer.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../../../model/user';
import {HttpErrorResponse} from '@angular/common/http';
import {Customer} from '../../../../model/customer';
import {NotifierService} from 'angular-notifier';
import {Event} from '../../../../model/event';
import {EventService} from '../../../../service/event.service';
import {Majors} from '../../../../model/majors';
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  formAddCustomer: FormGroup;
  formEdit: FormGroup;
  formCreate: FormGroup;
  eventList: Event[];
  thePageNumber = 1;
  thePageSize = 5;
  theTotalElements: number;
  itemPerPage = 1;
  customerList: Customer[] = [];
  // tslint:disable-next-line:max-line-length
  constructor(private customerService: CustomerService, private fb: FormBuilder, private notifier: NotifierService, private eventService: EventService) { }

  ngOnInit(): void {
    this.getListEvent2();
    this.customerService.getAllCustomer().subscribe(data => {
      this.customerList = data;
    });

    this.formCreate = this.fb.group(
      {
        name: [],
        location: [],
        date: [],
        startTime: [],
        endTime: [],
        customer: []
      }
    );
    this.formEdit = this.fb.group(
      {
        id: [],
        name: [],
        location: [],
        date: [],
        startTime: [],
        endTime: [],
        customer: [],
        flag: [],
      }
    );
    this.formAddCustomer = this.fb.group(
      {
        name: [],
        email: [],
      }
    );
  }

  getListEvent2() {
    this.eventService.getAllEvent(this.thePageNumber - 1, this.thePageSize).subscribe(this.processResult());
  }

  processResult() {
    return (data) => {
      this.eventList = data.content; //
      this.thePageNumber = data.number + 1;
      this.thePageSize = data.size;
      this.theTotalElements = data.totalElements;
      this.processItemPerPage();
    };
  }

  processItemPerPage() {
    if (this.thePageNumber * this.thePageSize > this.theTotalElements) {
      this.itemPerPage = this.theTotalElements;
    } else {
      this.itemPerPage = this.thePageNumber * this.thePageSize;
    }
  }
  public onOpenModal(user: User, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCustomerModal');
    }
    container.appendChild(button);
    button.click();
  }

  public addCustomer(addForm: FormGroup): void {
    this.customerService.addCustomer(addForm.value).subscribe(
      (data: Customer) => {
        this.resetForm();
        this.notifier.notify('success', 'Add customer successfully');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModalEvent(event: Event, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.formEdit.controls.id.setValue(event.id);
      this.formEdit.controls.name.setValue(event.name);
      this.formEdit.controls.location.setValue(event.location);
      this.formEdit.controls.date.setValue(event.date);
      this.formEdit.controls.startTime.setValue(event.startTime);
      this.formEdit.controls.endTime.setValue(event.endTime);
      this.formEdit.controls.customer.setValue(event.customer);
      this.formEdit.controls.flag.setValue(event.flag);
      button.setAttribute('data-target', '#editEventModal');
    }
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEventModal');
    }
    // if (mode === 'delete') {
    //   this.deleteUser = user;
    //   button.setAttribute('data-target', '#deleteUserModal');
    // }
    container.appendChild(button);
    button.click();
  }

  updatePageSize(pageSize) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.getListEvent2();
  }
  resetForm() {
    this.formAddCustomer.reset();
  }

  public onAddEvent(createForm: FormGroup): void {
    this.eventService.addEvent1(createForm.value).subscribe(
      (data: Event) => {
        this.getListEvent2();
        this.notifier.notify('success', 'Create event successfully');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onEditEvent(editForm: FormGroup): void {
    this.eventService.updateEvent(editForm.value).subscribe(
      (data: Event) => {
        this.getListEvent2();
        this.notifier.notify('success', 'Edit event successfully');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  compareCustomer(c1: Customer, c2: Customer): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
