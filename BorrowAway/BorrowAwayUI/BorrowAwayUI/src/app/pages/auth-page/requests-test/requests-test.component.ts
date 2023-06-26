import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DxButtonComponent } from 'devextreme-angular';
import jwtDecode from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-requests-test',
  templateUrl: './requests-test.component.html',
  styleUrls: ['./requests-test.component.scss'],
})
export class RequestsTestComponent implements OnInit {
  constructor(private _authservice: AuthService) {}
  loggedInUserEmail: string = '';
  loggedInUserName: string = '';
  loggedInUserRole: string = '';
  isDivHidden: boolean = true;
  message: string = 'Show Info';

  ngOnInit(): void {
    let token: string | null = localStorage.getItem('token');
    if (token != null) {
      const decodedToken: any = jwtDecode(token);
      this.loggedInUserEmail = decodedToken.email;
      this.loggedInUserName = decodedToken.name;
      this.loggedInUserRole = decodedToken.role;
    }
  }
  showInfo() {
    if (this.message == 'Show Info') {
      this.message = 'Hide Info';
      this.isDivHidden = false;
    } else {
      this.message = 'Show Info';
      this.isDivHidden = true;
    }
  }
}
