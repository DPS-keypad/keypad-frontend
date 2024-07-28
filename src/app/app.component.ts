import { Component } from '@angular/core';
import { ConfigService } from './service/config.service';
import { ActivatedRoute } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'dps-deck-app';
  spotifyConnected: boolean = false;

  constructor(
    private configService: ConfigService,
    private route: ActivatedRoute,
    private toastrService: NbToastrService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['auth_status']) {
        if (params['auth_status'] === 'success') {
          this.spotifyConnected = true;
          // Toastr notification
          this.toastrService.show(
            'Spotify successfully connected!',
            'Success',
            { status: 'success', position: NbGlobalPhysicalPosition.BOTTOM_RIGHT }
          );

        } else {
          // Toastr notification
          this.toastrService.show(
            params['error'] ? 'Error: ' + params['error'] : 'An error occurred while connecting to Spotify',
            'Error',
            { status: 'danger', position: NbGlobalPhysicalPosition.BOTTOM_RIGHT }
          );

        }
      }
    });
  }

  loginSpotify() {
    this.configService.loginSpotify();
  }

}
