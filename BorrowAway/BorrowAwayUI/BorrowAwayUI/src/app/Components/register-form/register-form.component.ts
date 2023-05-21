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

  public userToRegister:RegisterUser ={
    FirstName:'',
    LastName:'',
    Email:'',
    Password:''
  }

  private handleError(error:HttpErrorResponse){
    alert(error.error);
    return "ERROR";
  }
  public registerButtonClick():void{
      this._authService.registerUser(this.userToRegister).subscribe({
        next: response=>{
          let anyResponse:any =response;
          console.log(anyResponse.body);
        },
        error: err=>{
          console.log(err.status, err.error);
        }
      })
    }

  public backToLoginClick():void{
    this.changeFormToLoginEvent.emit();
  }
}
