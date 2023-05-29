import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private _authService:AuthService,private _router:Router){
  }
  public loginFormVisible:boolean = true;
  public toastVisible:boolean = false;
  public toastMessage:string = ' ';
  public toastType:string=' ';

  public changeFormToRegister():void{
    this.loginFormVisible=false;
  }
  public changeFormToLogin():void{
    this.loginFormVisible=true;
  }
  public showCreatedUserMessage():void{
    this.toastMessage = "User created successfully";
    this.toastType='success';
    this.toastVisible=true;
  }
  public showErrorMessage(errorMessage:string):void{
    this.toastMessage = errorMessage;
    this.toastType='error';
    this.toastVisible=true;
  }

  ngOnInit(): void {
    this.loginFormVisible = true;
  }



}
