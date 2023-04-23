import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestsTestComponent } from './Components/requests-test/requests-test.component';
import { AuthInterceptorInterceptor } from './Services/Interceptor/auth-interceptor.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './Components/auth/auth.component';
import { DxTextBoxModule,DxButtonModule } from 'devextreme-angular';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RequestsTestComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    DxTextBoxModule,
    DxButtonModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
