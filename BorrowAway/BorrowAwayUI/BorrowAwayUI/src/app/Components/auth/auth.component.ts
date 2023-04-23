import { Component, OnInit, ViewChild } from '@angular/core';
import { DxButtonComponent, DxTextBoxComponent } from 'devextreme-angular';
import { AuthService } from 'src/app/Services/auth.service';
import { createLogicalAnd } from 'typescript';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private _authService:AuthService){
  }
  @ViewChild('emailTextBox', { static: false })
  emailTextBox?: DxTextBoxComponent;

  @ViewChild('loginButton',{static:false})
  loginButton?:DxButtonComponent;

  private _fieldsCompleted: number = 0;
  public emailString: string = '';
  public passwordString: string = '';

  ngOnInit(): void {}

  public calculateCompletedFields(): void {
    if (this.emailString != '' && this.passwordString != '') {
      this._fieldsCompleted = 2;
    } else if (this.emailString == '' && this.passwordString == '') {
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
    this._authService.testGet().subscribe(response=>{
      console.log(response);
    })
  }

}
