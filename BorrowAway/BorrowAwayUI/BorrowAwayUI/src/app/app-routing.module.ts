import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestsTestComponent } from './AuthPage/requests-test/requests-test.component';
import { AuthComponent } from './AuthPage/auth/auth.component';
import { AuthGuard, LoginPageGuard } from './Guards/auth.guard';
import { HomePageComponent } from './HomePage/home-page/home-page.component';

const routes: Routes = [
  {
    path: 'requests',
    canActivate:[AuthGuard],
    component: RequestsTestComponent
  },
  {
    path:'home',
    canActivate:[AuthGuard],
    component:HomePageComponent
  },
  {
    path: '**',
    canActivate:[LoginPageGuard],
    component: AuthComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
