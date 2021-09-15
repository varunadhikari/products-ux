import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app/_services';
import { AppService } from '@app/_services/app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private appService: AppService,
    private accountService : AccountService) { }
  isCollapsed = true;
  ngOnInit() {
  }

  logout() {
    this.accountService.logout();
  }
  toggleSidebarPin() {
    this.appService.toggleSidebarPin();
  }
  toggleSidebar() {
    this.appService.toggleSidebar();
  }

}
