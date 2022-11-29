import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AccountService} from '../../../service/account.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  formGroup: FormGroup;
  isSubmitted = false;
  // tslint:disable-next-line:max-line-length
  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private accountService: AccountService) { }

  ngOnInit(): void {
    this.isSubmitted = false;
    this.formGroup = this.formBuilder.group({
      username: ['']
    });
  }


  onSubmit() {
    console.log(this.formGroup.value.username);
    this.accountService.resetPassword(this.formGroup.value.username).subscribe(
      data => {
        this.isSubmitted = true;
        console.log(0);
        this.toastr.success('Email has been sent!', 'Success:');
        console.log(1);
      }, error => {
        this.isSubmitted = false;
        this.toastr.error('Wrong username or username is not registered!', 'Error:');
      }
    );
  }
}
