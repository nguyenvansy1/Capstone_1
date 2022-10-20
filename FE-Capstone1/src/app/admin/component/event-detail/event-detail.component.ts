import { Component, OnInit } from '@angular/core';
import {Event} from '../../../../model/event';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../../../service/event.service';
import {EventUser} from '../../../../model/event_user';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: Event;
  id: number;
  eventList: EventUser[] = [];
  thePageNumber = 1;
  thePageSize = 2;
  theTotalElements: number;
  itemPerPage = 1;
  constructor(private activatedRoute: ActivatedRoute, private eventService: EventService) { }

  ngOnInit(): void {
    // tslint:disable-next-line:radix
    this.id = parseInt(this.activatedRoute.snapshot.params.id);
    this.eventService.findEventById(this.id).subscribe(event => {
        this.event = event;
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
    this.thePageSize = 1;
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
}
