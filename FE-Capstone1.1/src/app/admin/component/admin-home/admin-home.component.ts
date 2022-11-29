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
  url = 'assets/js/main.js';
  loadAPI: any;
  constructor(private router: Router, private tokenStorageService: TokenStorageService) {
  }
  ngOnInit(): void {
    this.loadAPI = new Promise(resolve => {
      this.loadScript();
    });
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
