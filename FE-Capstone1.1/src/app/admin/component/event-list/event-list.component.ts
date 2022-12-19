import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CustomerService} from '../../../../service/customer.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {User} from '../../../../model/user';
import {HttpErrorResponse} from '@angular/common/http';
import {Customer} from '../../../../model/customer';
import {Event} from '../../../../model/event';
import {EventService} from '../../../../service/event.service';
import {Majors} from '../../../../model/majors';
import {UserService} from '../../../../service/user.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../../service/security/token-storage.service';
import {ToastrService} from 'ngx-toastr';
import * as moment from 'moment';
import {formatDate} from '@angular/common';
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  submitted = false;
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
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn1') closeBtn1: ElementRef;
  url = 'assets/js/main.js';
  loadAPI: any;
  private roles: string[];

  // tslint:disable-next-line:max-line-length
  constructor(private toastr: ToastrService, private customerService: CustomerService, private tokenStorageService: TokenStorageService, private router: Router, private fb: FormBuilder, private eventService: EventService) {
  }

  ngOnInit(): void {
    this.loadAPI = new Promise(resolve => {
      this.loadScript();
    });
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
        name: ['', Validators.required],
        location: ['', Validators.required],
        dateGroup: this.fb.group({
        startTime: [],
        endTime: [],
        }, {validator: this.checkDay}),
        customer: ['', this.DefaultOption]
      }
    );
    this.formCreate.get('customer').setValue('Default');
    this.formEdit = this.fb.group(
      {
        id: [],
        name: [],
        location: [],
        startTime: [],
        endTime: [],
        customer: [],
        flag: [],
      }
    );
  }
  get customer() { return this.formCreate.get('customer'); }
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

  public onOpenModalEvent(event: Event, mode: string): void {
    const container = document.getElementById('wrapper');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.formEdit.controls.id.setValue(event.id);
      this.formEdit.controls.name.setValue(event.name);
      this.formEdit.controls.location.setValue(event.location);
      this.formEdit.controls.startTime.setValue(moment(event.startTime).format('YYYY-MM-DDTkk:mm'));
      this.formEdit.controls.endTime.setValue(moment(event.endTime).format('YYYY-MM-DDTkk:mm'));
      this.formEdit.controls.customer.setValue(event.customer);
      this.formEdit.controls.flag.setValue(event.flag);
      console.log(this.formEdit.value.startTime);
      button.setAttribute('data-target', '#editEventModal');
    }
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEventModal');
    }
    if (mode === 'delete') {
      this.deleteEventFlag = event;
      button.setAttribute('data-target', '#deleteEventModal');
    }
    console.log(container);
    console.log(button);
    container.appendChild(button);
    button.click();
  }

  updatePageSize(pageSize) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.getListEvent2();
  }

  resetFormEvent() {
    this.formCreate.reset();
  }

  public onAddEvent(createForm: FormGroup): void {
    this.submitted = true;
    this.eventService.addEvent1(createForm.value).subscribe(
      (data: Event) => {
        this.closeModal1();
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

  private closeModal1(): void {
    this.closeBtn1.nativeElement.click();
  }

  public loadScript() {
    const node = document.createElement('script');
    node.src = this.url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  checkDay(control: AbstractControl): ValidationErrors | null {
    const startTime = control.value.startTime;
    const endTime = control.value.endTime;
    const date1 = formatDate(startTime, 'yyyy-MM-dd hh:mm:ss', 'en_US');
    const date2 = formatDate(endTime, 'yyyy-MM-dd hh:mm:ss', 'en_US');
    return (date1 < date2 ) ? null : {dateError: true};
  }

  DefaultOption(control: AbstractControl): ValidationErrors {
    if (control.value === 'Default') {
      return { DefaultOption: true };
    } else {
      return null;
    }
  }
}
