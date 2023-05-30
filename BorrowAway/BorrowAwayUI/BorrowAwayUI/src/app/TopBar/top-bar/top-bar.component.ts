import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ButtonData } from 'src/app/Models/button-data';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit{

@Output() buttonClickedEvent:EventEmitter<string> = new EventEmitter();
@Input('buttonsData') buttonsData?:ButtonData[];


ngOnInit(): void {
    console.log(this.buttonsData);
}


public logButtonData(redirectUrl:string){
  this.buttonClickedEvent.emit(redirectUrl);
}
}
