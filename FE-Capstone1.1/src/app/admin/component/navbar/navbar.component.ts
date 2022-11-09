import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../../../service/security/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  userName: string;
  check: boolean;
  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.check = false;
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.userName = this.tokenStorageService.getUser().account.username;
      this.roles = this.tokenStorageService.getUser().account.roles[0].roleName;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      console.log('roles: ' + this.roles);
    }
  }
  logout() {
    this.check = false;
    this.tokenStorageService.signOut();
    window.location.reload();
    this.router.navigateByUrl('');
  }


  updateCheck() {;
    this.check = true;
  }
}
