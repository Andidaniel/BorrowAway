import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-requests-test',
  templateUrl: './requests-test.component.html',
  styleUrls: ['./requests-test.component.scss']
})

export class RequestsTestComponent implements OnInit{

  constructor(private readonly httpClient:HttpClient){}

  ngOnInit(): void {
      console.log("REQUEST COMPONENT INITED");
  }
  tryGet(){

    const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQW5kcmVpLURhbmllbCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFiZXJlc0B0cy5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTY4NDY3MDY1M30.fPoZ69A0YWjZp_O7EjfOZ6lbVLFyBQPbSG6QAJsR5tyOW7Ecc_SL7aQ1kT4gJSPsrbaik-U0I_n3N10hpgiRag";


    this.httpClient.get<any>(
      "https://localhost:8080/Auth/Test",
      {
        observe: 'response',
      }
      ).subscribe(response=>{
        let email:string = response.body;
        console.log(email);
      });

  }
}
