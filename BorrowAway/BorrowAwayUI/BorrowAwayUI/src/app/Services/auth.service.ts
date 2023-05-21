import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterUser } from '../Models/register-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }

  private _apiEndpoint:string = "https://localhost:8080/Auth";
  private _options:any = {
    observe:'response',
    responseType:'text'
  }


  public registerUser(userToRegister:RegisterUser):Observable<HttpEvent<string>>{
    return this.http.post<string>(this._apiEndpoint+"/Register",userToRegister,this._options);
  }

  public testGet():Observable<any>{
    return this.http.get(this._apiEndpoint+'Test');
  }
}
