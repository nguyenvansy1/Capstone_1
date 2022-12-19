import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../service/user.service';
import {User} from '../../../../model/user';
import * as moment from 'moment';
import {EventService} from '../../../../service/event.service';
import {EventUser} from '../../../../model/event_user';
import {TokenStorageService} from '../../../../service/security/token-storage.service';
import {Course} from '../../../../model/course';
import {Majors} from '../../../../model/majors';
import {Class} from '../../../../model/class';
import {CourseService} from '../../../../service/course.service';
import {MajorsService} from '../../../../service/majors.service';
import {ClassService} from '../../../../service/class.service';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User;
  code: number;
  uploadedAvatar = null;
  userErr: User;
  eventList: EventUser[] = [];
  thePageNumber = 1;
  thePageSize = 1;
  theTotalElements: number;
  itemPerPage = 1;
  isLoggedIn = false;
  username: string;
  private roles: string[];
  courseList: Course[];
  majorsList: Majors[];
  classList: Class[];
  formEdit: FormGroup;
  url = 'assets/js/main.js';
  loadAPI: any;
  type: string;
  oldAvatarLink = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';

  // tslint:disable-next-line:max-line-length
  constructor(private storage: AngularFireStorage, private toastr: ToastrService, private classService: ClassService, private fb: FormBuilder, private courseService: CourseService, private majorsService: MajorsService, private activatedRoute: ActivatedRoute, private tokenStorageService: TokenStorageService, private router: Router, private userService: UserService, private eventService: EventService) { }

  ngOnInit(): void {
    this.getUser();
    this.loadAPI = new Promise(resolve => {
      this.loadScript();
    });
    this.formEdit = this.fb.group(
      {
        code: [],
        // tslint:disable-next-line:max-line-length
        name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern('^[A-ZÀ|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ|È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ|Ì|Í|Ị|Ỉ|Ĩ|Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ|Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ|Ỳ|Ý|Ỵ|Ỷ|Ỹ|Đ][a-zà|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|ì|í|ị|ỉ|ĩ|ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ|ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ|ỳ|ý|ỵ|ỷ|ỹ]*([ ][A-ZÀ|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ|È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ|Ì|Í|Ị|Ỉ|Ĩ|Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ|Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ|Ỳ|Ý|Ỵ|Ỷ|Ỹ|Đ][a-zà|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|ì|í|ị|ỉ|ĩ|ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ|ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ|ỳ|ý|ỵ|ỷ|ỹ]*)*$')]],
        identityCard: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
        phone: ['', [ Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]  ],
        birthDay: ['', this.checkAge],
        gender: [],
        since: [],
        address: [],
        course: [],
        majors: [],
        classUser: [],
        account: [],
      }
    );

    this.getListEventByUser();
    this.courseService.getAllCourse().subscribe(data => {
      this.courseList = data;
    }, );
    this.majorsService.getAllMajors().subscribe(data => {
      this.majorsList = data;
    });
    this.classService.getAllClass().subscribe(data => {
      this.classList = data;
    });
    this.formEdit.controls.name.setValue(this.user.name);
    console.log(this.formEdit.value.name);
  }
  getUser() {
  // tslint:disable-next-line:radix
  this.code = parseInt(this.activatedRoute.snapshot.params['code']);
  this.userService.findUserByCode(this.code).subscribe(user => {
    this.user = user;
    this.formEdit.controls.code.setValue(this.user.code);
    this.formEdit.controls.name.setValue(this.user.name);
    this.formEdit.controls.identityCard.setValue(this.user.identityCard);
    this.formEdit.controls.phone.setValue(this.user.phone);
    this.formEdit.controls.birthDay.setValue(this.user.birthDay);
    this.formEdit.controls.gender.setValue(this.user.gender);
    console.log(this.formEdit.value.gender);
    this.formEdit.controls.since.setValue(this.user.since);
    this.formEdit.controls.address.setValue(this.user.address);
    this.formEdit.controls.course.setValue(this.user.course);
    this.formEdit.controls.majors.setValue(this.user.majors);
    this.formEdit.controls.classUser.setValue(this.user.classUser);
    this.formEdit.controls.account.setValue(this.user.account);
    if (user.avatar !== null) {
      this.oldAvatarLink = user.avatar;
    }
  }, (error) => {
  });
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

  compareCourse(c1: Course, c2: Course): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  compareMajors(c1: Majors, c2: Majors): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  compareClass(c1: Class, c2: Class): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  // checkAge(control: AbstractControl): ValidationErrors | null {
  //   const employeeDateOfBirth = control.value;
  //   const birthday = new Date(employeeDateOfBirth);
  //   const currentDate = new Date();
  //   const age = currentDate.getFullYear() - birthday.getFullYear();
  //   return age > 18 ? null : {invalidAge: true};
  // }
  checkAge(control: AbstractControl): ValidationErrors | null {
    const employeeDateOfBirth = control.value;
    return moment(employeeDateOfBirth).add(18, 'years') <=
      moment() ? null : {invalidAge: true} ;
  }
  public loadScript() {
    const node = document.createElement('script');
    node.src = this.url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  public onUpdateUser(editForm: FormGroup): void {
    console.log(editForm);
    this.userService.updateUser(editForm.value).subscribe(
      (data: any) => {
        this.toastr.success('Edit user successfully!', 'Success: ');
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Error: ');
      }
    );
  }

  getAvatar(event: any, code: number) {
    this.uploadedAvatar = event.target.files[0];
    this.type = event.target.files[0].type;
    if (this.type !== 'image/jpeg' && this.type !== 'image/png') {
      this.toastr.error('The requested file format is incorrect!', 'Error: ');
    } else {
      if (this.uploadedAvatar) {
        const reader = new FileReader();
        reader.readAsDataURL(this.uploadedAvatar);
        reader.onload = (e: any) => {
          this.oldAvatarLink = e.target.result;
        };
      }
      if (this.uploadedAvatar !== null) {
        // Upload img & download url
        const avatarName = this.getCurrentDateTime() + this.uploadedAvatar.name;
        const fileRef = this.storage.ref(avatarName);
        this.storage.upload(avatarName, this.uploadedAvatar).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              // delete old img from firebase
              if (this.user.avatar !== null) {
                this.storage.storage.refFromURL(this.user.avatar).delete();
              }

              // Update employee
              this.userService.updateAvatar(url, code).subscribe(
                () => {
                  this.toastr.success('Upload avatar successfully!', 'Success: ');
                },
                (error) => {
                  this.toastr.error('Upload avatar unsuccessfully!', 'Error: ');
                  this.uploadedAvatar = null;
                },
              );
            });
          })
        ).subscribe();
      }
    }
  }

  private getCurrentDateTime() {
    return new Date().getTime();
  }

}
