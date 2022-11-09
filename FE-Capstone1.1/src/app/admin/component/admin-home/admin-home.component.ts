import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../../service/security/token-storage.service';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  isLoggedIn = false;
  username: string;
  showAdminBoard = false;
  private roles: string[];
  constructor(private router: Router, private tokenStorageService: TokenStorageService) {
  }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (!this.isLoggedIn) {
      this.router.navigateByUrl('login');
    }
  }
}
