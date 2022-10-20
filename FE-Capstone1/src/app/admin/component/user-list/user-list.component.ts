import { Component, OnInit } from '@angular/core';

import {NotifierService} from 'angular-notifier';
import {User} from '../../../../model/user';
import {Course} from '../../../../model/course';
import {Majors} from '../../../../model/majors';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../../../service/user.service';
import {CourseService} from '../../../../service/course.service';
import {MajorsService} from '../../../../service/majors.service';
import {HttpErrorResponse} from '@angular/common/http';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: User[];
  courseList: Course[];
  majorsList: Majors[];
  thePageNumber = 1;
  thePageSize = 5;
  theTotalElements: number;
  itemPerPage = 1;
  formEdit: FormGroup;
  deleteUser: User;
  keywordName: undefined;
  // tslint:disable-next-line:max-line-length
  constructor(private userService: UserService, private courseService: CourseService, private majorsService: MajorsService, private fb: FormBuilder, private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getListUser();
    this.formEdit = this.fb.group(
      {
        code: [],
        name: [],
        identityCard: [],
        phone: [],
        birthDay: [],
        course: [],
        majors: []
      }
    );
    this.courseService.getAllCourse().subscribe(data => {
      this.courseList = data;
    });
    this.majorsService.getAllMajors().subscribe(data => {
      this.majorsList = data;
    });

  }

  getListUser() {
    if (this.keywordName !== undefined) {
      this.searchByCodeOrName(this.keywordName);
    } else {
      this.getListUser2();
    }
  }
  getListUser2() {
    this.userService.getAllUser(this.thePageNumber - 1, this.thePageSize).subscribe(this.processResult());
  }

  searchByCodeOrName(value: string) {
     console.log(value);
     this.userService.getUserByCodeOrName(this.thePageNumber - 1, this.thePageSize, value).subscribe(this.processResult());
  }
  processResult() {
    return (data) => {
      this.userList = data.content; //
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
    console.log(user);
    console.log(mode);
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      console.log(1);
      this.formEdit.controls.code.setValue(user.code);
      this.formEdit.controls.name.setValue(user.name);
      this.formEdit.controls.identityCard.setValue(user.identityCard);
      this.formEdit.controls.phone.setValue(user.phone);
      this.formEdit.controls.birthDay.setValue(user.birthDay);
      this.formEdit.controls.course.setValue(user.course);
      this.formEdit.controls.majors.setValue(user.majors);
      button.setAttribute('data-target', '#editUserModal');
    }
    if (mode === 'delete') {
      this.deleteUser = user;
      button.setAttribute('data-target', '#deleteUserModal');
    }
    container.appendChild(button);
    button.click();
    console.log(2);
  }

  public onUpdateUser(editForm: FormGroup): void {
    this.userService.updateUser(editForm.value).subscribe(
      (data: User) => {
        this.getListUser2();
        this.notifier.notify('success', 'Edit user successfully');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // public onDeleteUser(userId: number): void {
  //   this.userService.deleteCustomer(userId).subscribe(
  //     (data: void) => {
  //       this.getListUser2();
  //       this.notifier.notify('success', 'Delete user successfully');
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }



  updatePageSize(pageSize) {
    this.thePageSize = pageSize.value;
    this.thePageNumber = 1;
    this.getListUser();
  }

  compareCourse(c1: Course, c2: Course): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  compareMajors(c1: Majors, c2: Majors): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  blockUser(id: number) {
    this.userService.blockUser(id).subscribe(
      (data: void) => {
        this.getListUser2();
        this.notifier.notify('error', 'Block user successfully');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  unBlockUser(id: number) {
    this.userService.unBlockUser(id).subscribe(
      (data: void) => {
        this.getListUser2();
        this.notifier.notify('success', 'Unblock user successfully');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
