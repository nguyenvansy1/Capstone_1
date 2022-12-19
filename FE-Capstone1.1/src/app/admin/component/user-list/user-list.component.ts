import { Component, OnInit } from '@angular/core';

import {User} from '../../../../model/user';
import {Course} from '../../../../model/course';
import {Majors} from '../../../../model/majors';
import {FormBuilder, FormGroup, ValidationErrors, AbstractControl, Validators} from '@angular/forms';
import {UserService} from '../../../../service/user.service';
import {CourseService} from '../../../../service/course.service';
import {MajorsService} from '../../../../service/majors.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Class} from '../../../../model/class';
import {ClassService} from '../../../../service/class.service';
import {TokenStorageService} from '../../../../service/security/token-storage.service';
import {ToastrService} from 'ngx-toastr';
import {EventUser} from '../../../../model/event_user';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: User[];
  courseList: Course[];
  majorsList: Majors[];
  classList: Class[];
  thePageNumber = 1;
  thePageSize = 5;
  theTotalElements: number;
  itemPerPage = 1;
  formEdit: FormGroup;
  deleteUser: User;
  keywordName: undefined;
  isLoggedIn = false;
  username: string;
  showAdminBoard = false;
  order = true;
  isDesc = true;
  url = 'assets/js/main.js';
  loadAPI: any;
  private roles: string[];
  // tslint:disable-next-line:max-line-length
  constructor(private toastr: ToastrService, private userService: UserService, private tokenStorageService: TokenStorageService, private classService: ClassService, private router: Router, private courseService: CourseService, private majorsService: MajorsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadAPI = new Promise(resolve => {
      this.loadScript();
    });
    this.getListUser();
    this.formEdit = this.fb.group(
      {
        code: [],
        // tslint:disable-next-line:max-line-length
        name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern('^[A-ZÀ|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ|È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ|Ì|Í|Ị|Ỉ|Ĩ|Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ|Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ|Ỳ|Ý|Ỵ|Ỷ|Ỹ|Đ][a-zà|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|ì|í|ị|ỉ|ĩ|ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ|ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ|ỳ|ý|ỵ|ỷ|ỹ]*([ ][A-ZÀ|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ|È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ|Ì|Í|Ị|Ỉ|Ĩ|Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ|Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ|Ỳ|Ý|Ỵ|Ỷ|Ỹ|Đ][a-zà|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|ì|í|ị|ỉ|ĩ|ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ|ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ|ỳ|ý|ỵ|ỷ|ỹ]*)*$')]],
        identityCard: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
        phone: ['', [ Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]  ],
        birthDay: ['', this.checkAge],
        gender: [],
        email: [],
        since: [],
        address: [],
        course: [],
        majors: [],
        classUser: [],
        account: [],
      }
    );
    this.courseService.getAllCourse().subscribe(data => {
      this.courseList = data;
    }, (error) => {
      // if (error.status === 500) {
      //   this.router.navigateByUrl('/login');
      // }
    });
    this.majorsService.getAllMajors().subscribe(data => {
      this.majorsList = data;
    });
    this.classService.getAllClass().subscribe(data => {
      this.classList = data;
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
    console.log(1);
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      console.log(user);
      this.formEdit.controls.code.setValue(user.code);
      this.formEdit.controls.name.setValue(user.name);
      console.log(this.formEdit.value.name);
      this.formEdit.controls.identityCard.setValue(user.identityCard);
      this.formEdit.controls.phone.setValue(user.phone);
      this.formEdit.controls.birthDay.setValue(user.birthDay);
      this.formEdit.controls.gender.setValue(user.gender);
      this.formEdit.controls.since.setValue(user.since);
      this.formEdit.controls.classUser.setValue(user.classUser);
      this.formEdit.controls.account.setValue(user.account);
      this.formEdit.controls.address.setValue(user.address);
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

  compareClass(c1: Class, c2: Class): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  blockUser(id: number) {
    this.userService.blockUser(id).subscribe(
      (data: void) => {
        this.getListUser2();
        this.toastr.success('Block user successfully!', 'Success: ');
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Block user unsuccessfully!', 'Error: ');
      }
    );
  }

  unBlockUser(id: number) {
    this.userService.unBlockUser(id).subscribe(
      (data: void) => {
        this.getListUser2();
        this.toastr.info('Unblock user successfully!', 'Success: ');
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Unblock user unsuccessfully!', 'Error: ');
      }
    );
  }

  private getCurrentDateTime() {
    return new Date().getTime();
  }

  checkAge(control: AbstractControl): ValidationErrors | null {
    const employeeDateOfBirth = control.value;
    const birthday = new Date(employeeDateOfBirth);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthday.getFullYear();
    return age > 18 ? null : {invalidAge: true};
  }
  public loadScript() {
    const node = document.createElement('script');
    node.src = this.url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  sortCode() {
    if (this.order) {
      const newArray = this.userList.sort((a, b) => a.code - b.code);
      this.userList = newArray;
    } else {
      const newArray = this.userList.sort((a, b) => b.code - a.code);
      this.userList = newArray;
    }
    this.order = !this.order;
  }

  sortName() {
    if (this.isDesc) {
      // tslint:disable-next-line:max-line-length
      const result = this.userList.sort((a, b) => a.name.split(' ')[a.name.split(' ').length - 1].localeCompare(b.name.split(' ')[b.name.split(' ').length - 1]));
      this.userList = result;
    } else {
      // tslint:disable-next-line:max-line-length
      const result = this.userList.sort((a, b) => b.name.split(' ')[b.name.split(' ').length - 1].localeCompare(a.name.split(' ')[a.name.split(' ').length - 1]));
      this.userList = result;
    }
    this.isDesc = !this.isDesc;
  }
}
