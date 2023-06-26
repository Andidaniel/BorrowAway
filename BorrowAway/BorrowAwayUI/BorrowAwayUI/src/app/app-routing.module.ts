import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestsTestComponent } from './pages/auth-page/requests-test/requests-test.component';
import { AuthComponent } from './pages/auth-page/auth/auth.component';
import { AuthGuard, LoginPageGuard } from './guards/auth.guard';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AddPostComponent } from './pages/add-post/add-post.component';
import { AnnouncementComponent } from './pages/announcement/announcement.component';
import { AnnouncementsPageComponent } from './pages/announcements-page/announcements-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

const routes: Routes = [
  {
    path: 'requests',
    canActivate: [AuthGuard],
    component: RequestsTestComponent,
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomePageComponent,
  },
  {
    path: 'announcements',
    canActivate: [AuthGuard],
    component: AnnouncementsPageComponent,
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfilePageComponent,
  },
  {
    path: 'listItem',
    canActivate: [AuthGuard],
    component: AddPostComponent,
  },
  {
    path: 'announcement/:id',
    canActivate: [AuthGuard],
    component: AnnouncementComponent,
  },
  {
    path: '**',
    canActivate: [LoginPageGuard],
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
