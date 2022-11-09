import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {SecurityServiceService} from '../../../service/security/security-service.service';
import {Router} from '@angular/router';
import {ShareService} from '../../../service/security/share.service';
import {isElementScrolledOutsideView} from '@angular/cdk/overlay/position/scroll-clip';


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
    constructor(private formBuilder: FormBuilder,
                private tokenStorageService: TokenStorageService,
                private securityService: SecurityServiceService,
                private router: Router,
                ) {
    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            remember_me: false
        });
        console.log(this.tokenStorageService.getUser());
        if (this.tokenStorageService.getUser() !== null) {
            // this.securityService.isLoggedIn = true;
            // this.role = this.tokenStorageService.getUser().roles[0].roleName;
            // this.username = this.tokenStorageService.getUser().account.username;
            this.router.navigate(['admin/home']);
        }
    }

    login() {
        console.log(this.loginForm.value.remember_me);
        this.securityService.login(this.loginForm.value).subscribe(data => {
                console.log(data);
                if (this.loginForm.value.remember_me === true) {
                    this.tokenStorageService.saveUserLocal(data);
                    this.tokenStorageService.saveTokenLocal(data.jwtToken);
                } else if (this.loginForm.value.remember_me === false) {
                    this.tokenStorageService.saveUserSession(data);
                    this.tokenStorageService.saveTokenSession(data.jwtToken);
                }

                this.isLoggedIn = true;
                this.username = this.tokenStorageService.getUser().account.username;
                this.role = this.tokenStorageService.getUser().account.roles.roleName;
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
            () => {
                window.location.assign('admin/home');
                this.router.navigateByUrl('admin/home');
            });
    }
    // private loadRememberInfo() {
    //     if (this.tokenStorageService.getUser()) {
    //         this.role = this.tokenStorageService.getUser().account.roles[0];
    //         console.log(this.role);
    //         this.username = this.tokenStorageService.getUser().account.username;
    //         console.log(this.username);
    //         this.urlImg = this.tokenStorageService.getUser().urlImg;
    //     } else {
    //         this.role = null;
    //         this.username = null;
    //         this.urlImg = null;
    //         this.idEmployee = null;
    //     }
    //     this.isLoggedIn = this.username != null;
    // }
}
