import { Component } from '@angular/core';
import { ConfigService } from './service/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dps-deck-app';


  constructor(
    private configService: ConfigService
  ) { }

  loginSpotify() {
    this.configService.loginSpotify();
  }

}
