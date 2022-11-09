import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../service/user.service';
import {User} from '../../../../model/user';
import {Event} from '../../../../model/event';
import {EventService} from '../../../../service/event.service';
import {EventUser} from '../../../../model/event_user';
import {TokenStorageService} from '../../../../service/security/token-storage.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User;
  code: number;
  eventList: EventUser[] = [];
  thePageNumber = 1;
  thePageSize = 1;
  theTotalElements: number;
  itemPerPage = 1;
  isLoggedIn = false;
  username: string;
  showAdminBoard = false;
  private roles: string[];
  // tslint:disable-next-line:max-line-length
  constructor(private activatedRoute: ActivatedRoute, private tokenStorageService: TokenStorageService, private router: Router, private userService: UserService, private eventService: EventService) { }

  ngOnInit(): void {
    // tslint:disable-next-line:radix
    this.code = parseInt(this.activatedRoute.snapshot.params['code']);
    this.userService.findUserByCode(this.code).subscribe(user => {
        this.user = user;
      }, (error) => {
    });
    this.getListEventByUser();
  }
  getListEventByUser() {
    this.eventService.getEventByUser(this.code, this.thePageNumber - 1, this.thePageSize).subscribe(this.processResult());
  }
  processResult() {
    return (data) => {
      console.log(data);
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
    this.thePageSize = this.thePageSize + 1 ;
    this.thePageNumber = 1;
    this.getListEventByUser();
  }

  hide() {
    this.thePageSize = 1;
    this.thePageNumber = 1;
    this.getListEventByUser();
  }
}
