import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestsTestComponent } from './AuthPage/requests-test/requests-test.component';
import { AuthInterceptor} from './Services/Interceptor/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './AuthPage/auth/auth.component';
import { DxTextBoxModule,DxButtonModule,DxValidatorModule,DxToastModule, DxFileUploaderModule } from 'devextreme-angular';

import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './AuthPage/login-form/login-form.component';
import { RegisterFormComponent } from './AuthPage/register-form/register-form.component';
import { HomePageComponent } from './HomePage/home-page/home-page.component';
import { TopBarComponent } from './TopBar/top-bar/top-bar.component';
import { AddPostComponent } from './AddPost/add-post/add-post.component';


@NgModule({
  declarations: [
    AppComponent,
    RequestsTestComponent,
    AuthComponent,
    LoginFormComponent,
    RegisterFormComponent,
    HomePageComponent,
    TopBarComponent,
    AddPostComponent
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
    DxFileUploaderModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
