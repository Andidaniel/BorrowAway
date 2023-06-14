import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterUser } from '../Models/register-user';
import { LoginUser } from '../Models/login-user';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient,private _router:Router) {}

  private _apiEndpoint: string = 'https://localhost:8080/Auth';
  private _options: any = {
    observe: 'response',
    responseType: 'text',
  };

  public registerUser(
    userToRegister: RegisterUser
  ): Observable<HttpEvent<string>> {
    return this.http.post<string>(
      this._apiEndpoint + '/Register',
      userToRegister,
      this._options
    );
  }

  public loginUser(userToLogin: LoginUser): Observable<HttpEvent<string>> {
    return this.http.post<string>(
      this._apiEndpoint + '/Login',
      userToLogin,
      this._options
    );
  }
  public logoutUser():Observable<HttpEvent<string>>{
    return this.http.post<string>(
      this._apiEndpoint+'/Logout',
      "",
      this._options
    );
  }
  public isUserLoggedIn(): boolean {
    let token: string | null = localStorage.getItem('token');
    if (token != null) {
      const decodedToken: any = jwtDecode(token);
      let currentDate: number = new Date().getTime();
      let expDateString: number = +(decodedToken.exp + '000');
      if (expDateString < currentDate) {
        localStorage.clear();
        return false;
      } else {
        return true;
      }
    } else {
      localStorage.clear();
      return false;
    }
  }
}
