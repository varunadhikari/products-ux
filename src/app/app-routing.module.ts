import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './screens/dashboard/dashboard.component';

import { HomeComponent } from './screens/home';
import { OrderComponent } from './screens/order/order-component';
import { OrderSummaryComponent } from './screens/order/ordersummary/order-summary-component';
import { ProductList } from './screens/create-order/product.list.component';
import { AuthGuard } from './_helpers';

const accountModule = () => import('./screens/account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./screens/users/users.module').then(x => x.UsersModule);

const routes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },    
    { path: 'products', component: ProductList, canActivate: [AuthGuard] },
    { path: 'orders/:userId', component: OrderComponent, canActivate: [AuthGuard] },
    { path: 'osummary/:orderId', component: OrderSummaryComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }