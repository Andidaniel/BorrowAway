import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestsTestComponent } from './pages/auth-page/requests-test/requests-test.component';
import { AuthInterceptor } from './services/Interceptor/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './pages/auth-page/auth/auth.component';
import {
  DxTextBoxModule,
  DxButtonModule,
  DxValidatorModule,
  DxToastModule,
  DxSelectBoxModule,
  DxFileUploaderModule,
  DxTextAreaModule,
  DxNumberBoxModule,
  DxGalleryModule,
  DxDateBoxModule,
  DxPopupModule,
  DxTemplateModule,
} from 'devextreme-angular';

import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './pages/auth-page/login-form/login-form.component';
import { RegisterFormComponent } from './pages/auth-page/register-form/register-form.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TopBarComponent } from './shared/top-bar/top-bar.component';
import { AddPostComponent } from './pages/add-post/add-post.component';
import { AnnouncementComponent } from './pages/announcement/announcement.component';
import { AnnouncementsPageComponent } from './pages/announcements-page/announcements-page.component';
import { AnnouncementCardComponent } from './shared/announcement-card/announcement-card.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

@NgModule({
  declarations: [
    AppComponent,
    RequestsTestComponent,
    AuthComponent,
    LoginFormComponent,
    RegisterFormComponent,
    HomePageComponent,
    TopBarComponent,
    AddPostComponent,
    AnnouncementComponent,
    AnnouncementsPageComponent,
    AnnouncementCardComponent,
    ProfilePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    DxTextBoxModule,
    DxButtonModule,
    DxValidatorModule,
    DxToastModule,
    DxFileUploaderModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxNumberBoxModule,
    DxGalleryModule,
    DxDateBoxModule,
    DxPopupModule,
    DxTemplateModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
