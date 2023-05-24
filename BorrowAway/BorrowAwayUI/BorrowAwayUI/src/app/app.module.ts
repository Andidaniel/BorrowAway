import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestsTestComponent } from './Components/requests-test/requests-test.component';
import { AuthInterceptor} from './Services/Interceptor/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './Components/auth/auth.component';
import { DxTextBoxModule,DxButtonModule,DxValidatorModule,DxToastModule } from 'devextreme-angular';

import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './Components/login-form/login-form.component';
import { RegisterFormComponent } from './Components/register-form/register-form.component';


@NgModule({
  declarations: [
    AppComponent,
    RequestsTestComponent,
    AuthComponent,
    LoginFormComponent,
    RegisterFormComponent,
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
    DxToastModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
