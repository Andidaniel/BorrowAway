import { Component, OnInit, ViewChild } from '@angular/core';
import { DxTextBoxComponent } from 'devextreme-angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  @ViewChild('emailTextBox', { static: false })
  emailTextBox?: DxTextBoxComponent;

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
        return 'auth-container red-border';
      case 1:
        return 'auth-container yellow-border';
      case 2:
        return 'auth-container green-border';
      default:
        return 'auth-container red-border';
    }
  }
}
