import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Forecast } from 'src/app/Models/forecast';


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

    const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiUm9iZXJ0IC0gR2FicmllbCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InJtYXhpbUB0YWxlbnRpbmdzb2Z0d2FyZS5jb20iLCJleHAiOjE2ODE1NjU5NTh9.eY4dMWNNOs42EDQiXXuShy7rCk1pNUmT1mhtk2jHm_Zd577dAKp4GqrSwiNA2pkEOqQrvFoDuzD69KwfeJExPA";


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
