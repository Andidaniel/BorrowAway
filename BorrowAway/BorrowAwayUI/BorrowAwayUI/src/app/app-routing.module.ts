import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestsTestComponent } from './Components/requests-test/requests-test.component';
import { AuthComponent } from './Components/auth/auth.component';

const routes: Routes = [
  {
    path: 'requests',
    component: RequestsTestComponent,
  },
  {
    path: '**',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
