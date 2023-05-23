import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { RegisterUser } from 'src/app/Models/register-user';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  constructor(private _authService:AuthService){}
  @Output() changeFormToLoginEvent = new EventEmitter<void>();
  public createAccountButtonStyle:string="opacity:10%";
  public createAccountButtonDisabled:boolean=true;

  public userToRegister:RegisterUser ={
    FirstName:'',
    LastName:'',
    Email:'',
    Password:''
  }

  public registerButtonClick():void{
    this.createAccountButtonDisabled=true;
    this.createAccountButtonStyle="opacity:20%"
      this._authService.registerUser(this.userToRegister).subscribe({
        next: (response:any)=>{
          console.log(response.body);
          this.createAccountButtonDisabled=false;
          this.createAccountButtonStyle = "opacity:100%"
        },
        error: err=>{
          console.log(err.status, err.error);
          this.createAccountButtonDisabled=false;
          this.createAccountButtonStyle = "opacity:100%"
        }
      })
    }

  public calculateCreateAccountButtonStatus(){
    let numberOfCompletedFields:number=0;
    if(this.userToRegister.FirstName!='')
    {
      numberOfCompletedFields++;
    }
    if(this.userToRegister.LastName!=''){
      numberOfCompletedFields++;
    }
    if(this.userToRegister.Email!=''){
      numberOfCompletedFields++;
    }
    if(this.userToRegister.Password!=''){
      numberOfCompletedFields++;
    }
    switch(numberOfCompletedFields){
      case 0:
        this.createAccountButtonStyle = "opacity:20%"
        this.createAccountButtonDisabled = true;
        break;
      case 1:
        this.createAccountButtonStyle = "opacity:40%"
        this.createAccountButtonDisabled = true;
        break;
      case 2:
        this.createAccountButtonStyle = "opacity:60%"
        this.createAccountButtonDisabled = true;
        break;
      case 3:
        this.createAccountButtonStyle = "opacity:80%"
        this.createAccountButtonDisabled = true;
        break;
      case 4:
        this.createAccountButtonStyle = "opacity:100%"
        this.createAccountButtonDisabled = false;
        break;
    }
  }


  public backToLoginClick():void{
    this.changeFormToLoginEvent.emit();
  }
}
