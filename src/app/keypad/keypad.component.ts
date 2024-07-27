import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../service/config.service';
import * as e from 'express';

@Component({
  selector: 'keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.scss']
})
export class KeypadComponent implements OnInit {

  private currentButtonId: number = 0;
  private hidden: boolean = true;

  constructor(
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
  }

  button_click(buttonId: number) {
    // If the button clicked is the same as the current button, show it
    if (this.currentButtonId === buttonId || this.currentButtonId === 0 || this.hidden) {
      this.configService.toggleConfigHidden();
      this.hidden = !this.hidden;
    }
    if (!this.hidden) {
      this.configService.changeButtonId(buttonId);
    }
    this.changeButtonColor(buttonId);
    this.currentButtonId = buttonId;

  }

  changeButtonColor(newButtonId: number) {

    let newButton = document.getElementById('' + newButtonId);
    let oldButton = document.getElementById('' + this.currentButtonId);

    if (newButton && oldButton) {
      newButtonId === 10 || newButtonId === 11 ? newButton.style.backgroundColor = '#cdcdcd' : newButton.style.backgroundColor = 'grey';
      this.currentButtonId === 10 || this.currentButtonId === 11 ? oldButton.style.backgroundColor = 'grey' : oldButton.style.backgroundColor = 'black';

    } else if (newButton) {
      newButtonId === 10 || newButtonId === 11 ? newButton.style.backgroundColor = '#cdcdcd' : newButton.style.backgroundColor = 'grey';
    }

  }

}
