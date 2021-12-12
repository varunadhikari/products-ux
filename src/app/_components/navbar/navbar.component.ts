import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { AppService } from '@app/_services/app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user : User;

  constructor(private appService: AppService,
    private accountService : AccountService) {
      this.user = this.accountService.userValue;
     }
  isCollapsed = true;
  ngOnInit() {
  }

  logout() {
    this.accountService.logout();
    window.location.reload();
  }
  toggleSidebarPin() {
    this.appService.toggleSidebarPin();
  }
  toggleSidebar() {
    this.appService.toggleSidebar();
  }

}
