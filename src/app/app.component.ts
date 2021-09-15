import { Component } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';
import { Router } from '@angular/router';
import { AppService } from './_services/app.service';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: User;

    constructor(private accountService: AccountService,
        private router: Router,
        private appService: AppService) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    getClasses() {
        const classes = {
          'pinned-sidebar': this.appService.getSidebarStat().isSidebarPinned,
          'toggeled-sidebar': this.appService.getSidebarStat().isSidebarToggeled
        }
        return classes;
      }
      toggleSidebar() {
        this.appService.toggleSidebar();
      }

    logout() {
        this.accountService.logout();
    }

    navigateToOrders(){
        this.router.navigate(["/orders",this.user.id]);
    }
}