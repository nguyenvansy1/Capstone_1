import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Password} from '../../../../model/password';
import {NotifierService} from 'angular-notifier';
import {TokenStorageService} from '../../../../service/security/token-storage.service';
import {Account} from '../../../../model/account';
import {AccountService} from '../../../../service/account.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm: FormGroup;
  accountId: number;
  updatePassword: Password = {};
  error = false;
  check: boolean;
  isLoggedIn = false;
  username: string;
  showAdminBoard = false;
  private roles: string[];
  // tslint:disable-next-line:max-line-length
  constructor(private toastr: ToastrService, private fb: FormBuilder, private notifier: NotifierService, private tokenStorageService: TokenStorageService, private account: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (!this.isLoggedIn) {
      this.router.navigateByUrl('login');
    }
    this.passwordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      passwordGroup: this.fb.group({
        // tslint:disable-next-line:max-line-length
        newPassword: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,13}$')]],
        confirmPassword: ['', [Validators.required]]
      }, {validator: this.comparePassword}),
    });
  }
  changePassword() {
    const formValue = this.passwordForm.value;
    this.updatePassword.oldPassword = formValue.oldPassword;
    this.updatePassword.newPassword = formValue.passwordGroup.newPassword;
    this.updatePassword.confirmPassword = formValue.passwordGroup.confirmPassword;

    this.accountId = this.tokenStorageService.getUser().account.accountId;
    console.log(this.accountId);
    this.account.updatePassword(this.accountId, this.updatePassword).subscribe(
      () => {
      },
      (error) => {
        if (error.status === 400) {
          this.error = true;
          this.check = true;
          this.toastr.error('Please check the information again!', 'Error: ');
        }
        if (error.status === 404) {
          this.error = true;
          this.toastr.error('Data does not exist!', 'Error: ');
        }
      },
      () => {
        this.check = false;
        this.passwordForm.reset();
        this.toastr.success('Password update successful!', 'Success: ');
      }
    );
  }

  comparePassword(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    return (value.newPassword === value.confirmPassword) ? null : {invalidConfirmation: true};
  }
}
