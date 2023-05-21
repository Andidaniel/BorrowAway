import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { DxButtonComponent, DxTextBoxComponent } from 'devextreme-angular';
import { LoginUser } from 'src/app/Models/login-user';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  @ViewChild('emailTextBox', { static: false })
  emailTextBox?: DxTextBoxComponent;

  @Output() changeFormToRegisterEvent = new EventEmitter<void>();

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
    console.log(this.userToLogin.Email,this.userToLogin.Password);
    //TODO: Add Request to LOGIN
  }
  public registerClick():void{
    this.changeFormToRegisterEvent.emit();
  }
}
