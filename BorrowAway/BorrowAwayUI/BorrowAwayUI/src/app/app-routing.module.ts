import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestsTestComponent } from './Components/requests-test/requests-test.component';
import { AuthComponent } from './Components/auth/auth.component';
import { AuthGuard, LoginPageGuard } from './Guards/auth.guard';

const routes: Routes = [
  {
    path: 'requests',
    canActivate:[AuthGuard],
    component: RequestsTestComponent
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
