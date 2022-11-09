import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../../service/account.service';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {NotifierService} from 'angular-notifier';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-verifi-reset-password',
  templateUrl: './verifi-reset-password.component.html',
  styleUrls: ['./verifi-reset-password.component.css']
})
export class VerifiResetPasswordComponent implements OnInit {
  formResetPassword: FormGroup;
  isSuccessful = true;
  isSendMail: boolean;
  passwordGroup: FormGroup;
  code: string;
  constructor(private route: ActivatedRoute,
              private accountService: AccountService,
              private formBuilder: FormBuilder,
              private router: Router,
              private notifier: NotifierService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formResetPassword = this.formBuilder.group({
      passwordGroup: this.formBuilder.group({
        // tslint:disable-next-line:max-line-length
        newPassword: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,13}$')]],
        confirmPassword: ['', [Validators.required]]
      }, {validator: this.comparePassword}),
    });

    this.route.queryParams.subscribe(params => {
      const code = params.code;
      if (code == null) {
        this.isSendMail = false;
      } else {
        this.isSendMail = true;
        this.accountService.verifyPassword(code).subscribe(
          data => {
            this.isSuccessful = true;
          },
          err => {
            this.router.navigateByUrl('');
          }
        );
      }
    });
  }

  onSubmit() {
    console.log(this.formResetPassword.value.passwordGroup.newPassword);
    console.log(this.formResetPassword.value.passwordGroup.confirmPassword);
    if (this.formResetPassword.value.passwordGroup.newPassword === this.formResetPassword.value.passwordGroup.confirmPassword) {
      this.route.queryParams.subscribe(params => {
        this.code = params.code;
      });
      this.accountService.doResetPassword(this.formResetPassword.value.passwordGroup.newPassword, this.code).subscribe(data => {
        this.toastr.success('Password has been changed!', 'Success: ');
        this.router.navigateByUrl('');
      });
    } else {
      this.toastr.error('Enter verify password does not match!', 'Error: ');
    }
  }

  comparePassword(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    return (value.newPassword === value.confirmPassword) ? null : {invalidConfirmation: true};
  }
}
