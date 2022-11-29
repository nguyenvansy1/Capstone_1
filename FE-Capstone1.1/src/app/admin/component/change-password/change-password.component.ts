import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Password} from '../../../../model/password';
import {TokenStorageService} from '../../../../service/security/token-storage.service';
import {Account} from '../../../../model/account';
import {AccountService} from '../../../../service/account.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {isElementScrolledOutsideView} from '@angular/cdk/overlay/position/scroll-clip';

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
  url = 'assets/js/main.js';
  loadAPI: any;
  // tslint:disable-next-line:max-line-length
  constructor(private toastr: ToastrService, private fb: FormBuilder, private tokenStorageService: TokenStorageService, private account: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.loadAPI = new Promise(resolve => {
      this.loadScript();
    });
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
    this.updatePassword.oldPassword = this.passwordForm.value.oldPassword;
    this.updatePassword.newPassword = this.passwordForm.value.passwordGroup.newPassword;
    this.updatePassword.confirmPassword = this.passwordForm.value.passwordGroup.confirmPassword;
    this.accountId = this.tokenStorageService.getUser().account.accountId;
    console.log(this.updatePassword);
    this.account.updatePassword(this.accountId, this.updatePassword).subscribe(
      () => {
        this.router.navigateByUrl('admin/home');
        this.toastr.success('Password update successful!', 'Success: ');
      },
      (error) => {
          this.error = true;
          this.check = true;
          this.toastr.error('Please check the information again!', 'Error: ');
      },
    );
  }

  comparePassword(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    return (value.newPassword === value.confirmPassword) ? null : {invalidConfirmation: true};
  }
  public loadScript() {
    const node = document.createElement('script');
    node.src = this.url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

}
