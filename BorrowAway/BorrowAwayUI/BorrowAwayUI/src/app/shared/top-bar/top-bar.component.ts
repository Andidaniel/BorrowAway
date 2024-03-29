import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ButtonData } from 'src/app/models/button-data';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  @Output() buttonClickedEvent: EventEmitter<string> = new EventEmitter();
  @Input('buttonsData') buttonsData?: ButtonData[];

  ngOnInit(): void {}

  public logButtonData(redirectUrl: string) {
    this.buttonClickedEvent.emit(redirectUrl);
  }
}
