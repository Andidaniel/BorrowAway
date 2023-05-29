import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxButtonComponent, DxTextBoxComponent } from 'devextreme-angular';
import { LoginUser } from 'src/app/Models/login-user';
import { AuthService } from 'src/app/Services/auth.service';
import { ErrorHandlingService } from 'src/app/Services/error-handling.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  constructor(private _authService:AuthService, private _errorService:ErrorHandlingService,private _router:Router){}
  @ViewChild('emailTextBox', { static: false })
  emailTextBox?: DxTextBoxComponent;

  @Output() changeFormToRegisterEvent = new EventEmitter<void>();
  @Output() receivedLoginErrorEvent = new EventEmitter<string>();
  private _fieldsCompleted: number = 0;
  public userToLogin:LoginUser= {
    Email:'',
    Password:''
  }

  public calculateCompletedFields(): void {
    if (this.userToLogin.Email != '' && this.userToLogin.Password != '') {
      this._fieldsCompleted = 2;
    } else if (this.userToLogin.Email == '' && this.userToLogin.Password == '') {
      this._fieldsCompleted = 0;
    } else {
      this._fieldsCompleted = 1;
    }
  }
  public getAuthContainerClass(): string {
    switch (this._fieldsCompleted) {
      case 0:
        return 'red-border';
      case 1:
        return 'yellow-border';
      case 2:
        return 'green-border';
      default:
        return 'red-border';
    }
  }
  public loginClick():void{
    this._authService.loginUser(this.userToLogin).subscribe({
      next:(response:any)=>{
        localStorage.clear();
        localStorage.setItem("token",response.body);
        this._router.navigateByUrl('requests');
      },
      error:err=>{
        this.receivedLoginErrorEvent.emit(this._errorService.getError(err.error))
        console.log(this._errorService.getError(err.error));

      }
    })
  }
  public registerClick():void{
    this.changeFormToRegisterEvent.emit();
  }
}
