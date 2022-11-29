import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {SecurityServiceService} from '../../../service/security/security-service.service';
import {Router} from '@angular/router';
import {ShareService} from '../../../service/security/share.service';
import {isElementScrolledOutsideView} from '@angular/cdk/overlay/position/scroll-clip';
import {ToastrService} from 'ngx-toastr';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    username: string;
    password: string;
    roles: string[] = [];
    errorMessage = '';
    checkUserName = false;
    checkPassWord = false;
    isLoggedIn: boolean;
    role: string;
  url = 'assets/js/main.js';
  loadAPI: any;
    constructor(private toastr: ToastrService, private formBuilder: FormBuilder,
                private tokenStorageService: TokenStorageService,
                private securityService: SecurityServiceService,
                private router: Router,
                ) {
    }

    ngOnInit(): void {
      this.loadAPI = new Promise(resolve => {
        this.loadScript();
      });
      this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            remember_me: false
        });
      if (this.tokenStorageService.getUser() !== null) {
            // this.securityService.isLoggedIn = true;
            // this.role = this.tokenStorageService.getUser().roles[0].roleName;
            // this.username = this.tokenStorageService.getUser().account.username;
            this.router.navigate(['admin/home']);
        }
    }

    login() {
        this.securityService.login(this.loginForm.value).subscribe(data => {
                if (this.loginForm.value.remember_me === true) {
                    this.tokenStorageService.saveUserSession(data);
                    this.tokenStorageService.saveTokenSession(data.jwtToken);
                    this.tokenStorageService.saveTokenLocal(data.jwtToken);
                    this.tokenStorageService.saveUserLocal(data);
                } else if (this.loginForm.value.remember_me === false) {
                  this.tokenStorageService.saveUserSession(data);
                  this.tokenStorageService.saveTokenSession(data.jwtToken);
                  this.tokenStorageService.saveTokenLocal(data.jwtToken);
                  this.tokenStorageService.saveUserLocal(data);
                }
                this.isLoggedIn = true;
                this.username = this.tokenStorageService.getUser().account.username;
                this.role = this.tokenStorageService.getUser().account.roles.roleName;
                this.reloadPage();
            }
            , error => {
                if (this.loginForm.value.username === '') {
                    this.checkUserName = true;
                }
                if (this.loginForm.value.password === '') {
                    this.checkPassWord = true;
                }
                this.isLoggedIn = false;
                if (this.loginForm.value.username !== '' && this.loginForm.value.password !== '') {
                  this.errorMessage = 'Tài khoản hoặc mật khẩu không đúng';
                }
            },
            );
    }
  reloadPage(): void {
    if (this.tokenStorageService.getUser().account.roles[0].roleId === 1) {
      this.router.navigateByUrl('admin/home');
      this.toastr.success('Login successfully!', 'Success: ');
      return;
    } else {
      this.tokenStorageService.signOut();
      this.toastr.error('Insufficient access!', 'Error: ');
    }
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
