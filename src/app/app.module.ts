import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';


// used to create fake backend
//simport { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './screens/home';;
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { OrderComponent } from './screens/order/order-component';
import { OrderSummaryComponent } from './screens/order/ordersummary/order-summary-component';
import { FooterComponent } from './_components/footer/footer.component';
import { CollapseModule } from 'ngx-bootstrap';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { SidebarComponent } from './_components/sidebar/sidebar.component';
import { ProductList } from './screens/create-order/product.list.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        FlexLayoutModule,
        FormsModule,
        BrowserAnimationsModule,
    CollapseModule.forRoot()  ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        DashboardComponent,
        OrderComponent,
        OrderSummaryComponent,
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        ProductList
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }

        // provider used to create fake backend
        //fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };