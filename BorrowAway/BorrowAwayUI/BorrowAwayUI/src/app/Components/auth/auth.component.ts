import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(){
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
    this.toastVisible = true;
  }
  showErrorMessage(errorMessage:string){
    this.toastMessage = errorMessage;
    this.toastType='error';
    this.toastVisible=true;
  }

  ngOnInit(): void {
    this.loginFormVisible = true;
  }



}
