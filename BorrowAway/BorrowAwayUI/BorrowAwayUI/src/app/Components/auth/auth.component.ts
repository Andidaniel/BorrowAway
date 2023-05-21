import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private _authService:AuthService){
  }
  public loginFormVisible:boolean = true;

  public changeFormToRegister():void{
    this.loginFormVisible=false;
  }
  public changeFormToLogin():void{
    this.loginFormVisible=true;
  }
  ngOnInit(): void {
    this.loginFormVisible = true;
  }



}
