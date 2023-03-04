import { HttpClient } from '@angular/common/http';
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
    let forecasts: Forecast[] | null;
    this.httpClient.get<Forecast[]>(
      "https://localhost:8080/WeatherForecast",
      {observe: 'response'}).subscribe(response=>{
        forecasts = response.body;
        console.log(forecasts);
      });

  }
}
