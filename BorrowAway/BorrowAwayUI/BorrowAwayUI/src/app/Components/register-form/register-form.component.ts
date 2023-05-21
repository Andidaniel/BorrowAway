import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
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
  public registerButtonClick():void{
    this._authService.registerUser(this.userToRegister).subscribe((response:any)=>{
      console.log(response.body);
    });

  }

  public backToLoginClick():void{
    this.changeFormToLoginEvent.emit();
  }
}
