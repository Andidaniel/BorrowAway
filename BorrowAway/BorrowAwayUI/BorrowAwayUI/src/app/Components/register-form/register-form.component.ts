import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  @Output() changeFormToLoginEvent = new EventEmitter<void>();

  public backToLoginClick():void{
    console.log("Clicked button");

    this.changeFormToLoginEvent.emit();
  }
}
