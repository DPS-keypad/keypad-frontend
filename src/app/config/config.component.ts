import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../service/config.service';

@Component({
  selector: 'config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  configHidden = true;

  constructor(
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.configService.configHidden.subscribe((value) => {
      this.configHidden = value;
    });
  }

  setAction(action: string) {
    this.configService.setAction(action);
  }
}
