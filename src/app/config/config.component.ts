import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../service/config.service';
import { ApiDTO } from '../DTO/apiDTO';

@Component({
  selector: 'config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  hidden = true;
  selectedButtonId:number = 0;
  keys: ApiDTO[] = [];
  pots: ApiDTO[] = [];

  constructor(
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.configService.observableHidden.subscribe((value) => {
      this.hidden = value;
    });
    this.configService.observableSelectedButtonId.subscribe((value) => {
      this.selectedButtonId = value;
    });
    // fetch the list of APIs
    this.configService.getApiList().subscribe((data: { keys: ApiDTO[], pots: ApiDTO[] }) => {
      this.keys = data.keys;
      this.pots = data.pots;
    });
  }

  setAction(action: string) {
    this.configService.setAction(action);
  }

  getImage(api: string) {
    return "assets/images/icons/" + api + ".png";
  }

  getIcon(icon?: string): string {
    if (icon) {
      return icon;
    } else {
      return "";
    }
  }
}
