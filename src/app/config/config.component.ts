import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../service/config.service';

@Component({
  selector: 'config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  configHidden = true;
  keys = { "keyboard": [{ "description": "Cut", "id": "keyboard_cut", "key": "ctrl+x" }, { "description": "Copy", "id": "keyboard_copy", "key": "ctrl+c" }, { "description": "Paste", "id": "keyboard_paste", "key": "ctrl+v" }], "spotify": [{ "description": "Play/Pause", "id": "spotify_play" }, { "description": "Next", "id": "spotify_next" }, { "description": "Previous", "id": "spotify_previous" }] }
  pots = [];

  constructor(
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.configService.configHidden.subscribe((value) => {
      this.configHidden = value;
    });
    // fetch the list of APIs
    this.configService.getApiList().subscribe((data) => {
      this.keys = data.keys;
      this.pots = data.pots;
      console.log(this.keys);
      console.log(this.pots);
    });
  }

  setAction(action: string) {
    this.configService.setAction(action);
  }

  getImage(key: Object) {
    return "assets/images/icons/spotify.png"
  }
}
