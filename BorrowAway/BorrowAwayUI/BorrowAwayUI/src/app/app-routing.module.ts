import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestsTestComponent } from './AuthPage/requests-test/requests-test.component';
import { AuthComponent } from './AuthPage/auth/auth.component';
import { AuthGuard, LoginPageGuard } from './Guards/auth.guard';
import { HomePageComponent } from './HomePage/home-page/home-page.component';
import { AddPostComponent } from './AddPost/add-post/add-post.component';
import { AnnouncementComponent } from './ViewAnnouncement/announcement/announcement.component';
import { AnnouncementsPageComponent } from './announcements-page/announcements-page.component';

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
