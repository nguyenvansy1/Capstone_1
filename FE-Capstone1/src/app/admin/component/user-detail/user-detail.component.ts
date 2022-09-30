import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../../service/user.service';
import {User} from '../../../../model/user';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User;
  code: number;
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    // tslint:disable-next-line:radix
    this.code = parseInt(this.activatedRoute.snapshot.params['code']);
    this.userService.findUserByCode(this.code).subscribe(user => {;
        this.user = user;
        console.log(user);
      }
    );
  }

}
