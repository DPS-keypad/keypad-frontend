import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Backend } from '../configuration';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {

  private hidden = new BehaviorSubject<boolean>(true);
  observableHidden = this.hidden.asObservable();
  private selectedButtonId = new BehaviorSubject<number>(0);
  observableSelectedButtonId = this.selectedButtonId.asObservable();

  constructor(private http: HttpClient) { }

  toggleConfigHidden() {
    this.hidden.next(!this.hidden.value);
  }

  changeButtonId(buttonId: number) {
    this.selectedButtonId.next(buttonId);
  }

  setAction(action: string) {
    let key = (this.selectedButtonId.value > 10 ? "pot" : "key") + this.selectedButtonId.value;
    console.log('Action: ' + action + ' Button ID: ' + key);
    const payload = {
      key: key,
      action: action,
    };
    this.http
      .post(Backend.url + '/set_api', payload, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .subscribe((data) => {
        console.log(data);
      });
  }

  getApiList(): Observable<any> {
    return this.http.get(Backend.url + '/api_list', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  loginSpotify(): void {
    const CLIENT_ID = 'd68f5af7ddd941369a760d7e4f958033';
    const REDIRECT_URI = 'http://localhost:8000/callback';
    const AUTH_URL = 'https://accounts.spotify.com/authorize';

    const scope = 'user-modify-playback-state user-read-currently-playing app-remote-control user-read-private user-read-email';

    const params = {
      client_id: CLIENT_ID,
      response_type: 'code',
      scope: scope,
      redirect_uri: REDIRECT_URI,
      show_dialog: 'true'
    };

    const authUrl = `${AUTH_URL}?${new URLSearchParams(params).toString()}`;
    window.location.href = authUrl;
  }

}
