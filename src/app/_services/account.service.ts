﻿import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { OrderSummaryData } from '@app/_models/order.summary.data';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    private orderDetails: BehaviorSubject<OrderSummaryData>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    public sendOrderDetails(data: OrderSummaryData) {
        this.orderDetails = new BehaviorSubject<OrderSummaryData>(data);
    }

    clearMessages() {
        this.orderDetails.next(null);
    }

    getOrderDetails(): Observable<OrderSummaryData> {
        return this.orderDetails.asObservable();
    }

    login(username, password) {
        return this.http.post<User>(`${environment.apiUrl}/external/user`, { username : username, password : password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/external/user/save`, user);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/external/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/external/user/${id}`);
    }

    update(id ,params) {
        return this.http.put(`${environment.apiUrl}externals/user/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }
}