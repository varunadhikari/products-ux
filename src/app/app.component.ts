import { Component } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';
import { Router } from '@angular/router';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: User;

    constructor(private accountService: AccountService,
        private router: Router) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.accountService.logout();
    }

    navigateToOrders(){
        this.router.navigate(["/orders",this.user.id]);
    }
}