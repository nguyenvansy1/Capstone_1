import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Event} from '../../../../model/event';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../../../../service/event.service';
import {EventUser} from '../../../../model/event_user';
import {TokenStorageService} from '../../../../service/security/token-storage.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  event: Event;
  id: number;
  eventList: EventUser[] = [];
  thePageNumber = 1;
  thePageSize = 10000;
  theTotalElements: number;
  itemPerPage = 1;
  isLoggedIn = false;
  username: string;
  showAdminBoard = false;
  private roles: string[];
  // tslint:disable-next-line:max-line-length
  formImport: FormGroup;
  // tslint:disable-next-line:max-line-length
  constructor(private toastr: ToastrService, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private tokenStorageService: TokenStorageService, private eventService: EventService, private router: Router) { }

  ngOnInit(): void {
    this.formImport = this.fb.group(
      {
        student: ['', [Validators.required]],
        id: []
      }
    );
    // tslint:disable-next-line:radix
    this.id = parseInt(this.activatedRoute.snapshot.params.id);
    this.eventService.findEventById(this.id).subscribe(event => {
        this.event = event;
        this.formImport.controls.id.setValue(this.event.id);
      }, (error) => {
      }
    );
    this.getListUserByEvent();
  }
  getListUserByEvent() {
    this.eventService.getUserByEvent(this.id, this.thePageNumber - 1, this.thePageSize).subscribe(this.processResult());
  }

  processResult() {
    return (data) => {
      this.eventList = data.content;
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

  seeAllActivities() {
    this.thePageSize = this.theTotalElements ;
    this.thePageNumber = 1;
    this.getListUserByEvent();
  }

  hide() {
    this.thePageSize = 3;
    this.thePageNumber = 1;
    this.getListUserByEvent();
  }

  export(id: number) {
    this.eventService.getExcel(id).subscribe(x => {
      const blob = new Blob([x], {type: 'application/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob);
        return;
      }
      const data1 = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data1;
      link.download = 'event.xlsx';
      link.dispatchEvent(new MouseEvent('click' , {bubbles: true, cancelable: true, view: window}));
      // tslint:disable-next-line:only-arrow-functions
      setTimeout(function() {
        window.URL.revokeObjectURL(data1);
        link.remove();
      }, 100);
    });
  }

  import() {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#textarea');
    container.appendChild(button);
    button.click();
  }

  importStudent(formImport: FormGroup) {
    console.log(formImport.value.id);
    this.eventService.import(formImport.value.student, formImport.value.id).subscribe(event => {
      this.closeModal();
      this.ngOnInit();
      this.toastr.success('Import user successfully!', 'Success: ');
      }, (error) => {
      this.toastr.error('Import user unsuccessfully!', 'Error: ');
      }
    );
  }
  resetForm() {
    this.formImport.reset();
  }
  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }
}
