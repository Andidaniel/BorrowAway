import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public fieldsCompleted: number = 0;
  public emailErrors:string[] = ['asd'];
  ngOnInit(): void {}

  public getAuthContainerClass(): string {
    switch (this.fieldsCompleted) {
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
