import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CustomerService} from '../../../../service/customer.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../model/user';
import {HttpErrorResponse} from '@angular/common/http';
import {Customer} from '../../../../model/customer';
import {NotifierService} from 'angular-notifier';
import {Event} from '../../../../model/event';
import {EventService} from '../../../../service/event.service';
import {Majors} from '../../../../model/majors';
import {UserService} from '../../../../service/user.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../../service/security/token-storage.service';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  formAddCustomer: FormGroup;
  formEdit: FormGroup;
  formCreate: FormGroup;
  eventList: Event[];
  thePageNumber = 1;
  thePageSize = 5;
  theTotalElements: number;
  itemPerPage = 1;
  customerList: Customer[] = [];
  deleteEventFlag: Event;
  isLoggedIn = false;
  username: string;
  private roles: string[];
  // tslint:disable-next-line:max-line-length
  constructor(private toastr: ToastrService, private customerService: CustomerService, private tokenStorageService: TokenStorageService, private router: Router, private fb: FormBuilder, private notifier: NotifierService, private eventService: EventService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (!this.isLoggedIn) {
      this.router.navigateByUrl('login');
    }
    this.getListEvent2();
    this.customerService.getAllCustomer().subscribe(data => {
      this.customerList = data;
    }, (error) => {
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
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
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
        this.resetFormCustomer();
        this.toastr.success('Add customer successfully!', 'Success: ');
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Add customer unsuccessfully!', 'Error: ');
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
    if (mode === 'delete') {
      this.deleteEventFlag = event;
      button.setAttribute('data-target', '#deleteEventModal');
    }
    container.appendChild(button);
    button.click();
  }

  updatePageSize(pageSize) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.getListEvent2();
  }
  resetFormCustomer() {
    this.formAddCustomer.reset();
  }

  resetFormEvent() {
    this.formCreate.reset();
  }

  public onAddEvent(createForm: FormGroup): void {
    this.eventService.addEvent1(createForm.value).subscribe(
      (data: Event) => {
        this.resetFormEvent();
        this.ngOnInit();
        this.toastr.success('Create event successfully!', 'Success: ');
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Create event unsuccessfully!', 'Error: ');
      }
    );
  }
  public onEditEvent(editForm: FormGroup): void {
    this.eventService.updateEvent(editForm.value).subscribe(
      (data: Event) => {
        this.getListEvent2();
        this.toastr.success('Edit event successfully!', 'Success: ');
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Edit event unsuccessfully!', 'Error: ');
      }
    );
  }

  compareCustomer(c1: Customer, c2: Customer): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  deleteEvent(id: any) {
    this.eventService.deleteByFlag(id).subscribe(
      () => {
        this.toastr.success('Delete event successfully!', 'Success: ');
        this.closeModal();
        this.getListEvent2();
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Delete event unsuccessfully!', 'Error: ');
      }
    );
  }
  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }
}
