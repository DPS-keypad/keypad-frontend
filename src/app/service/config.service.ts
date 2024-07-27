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
  configHidden = this.hidden.asObservable();
  private selectedButtonId: number = 0;

  constructor(private http: HttpClient) {}

  toggleConfigHidden() {
    this.hidden.next(!this.hidden.value);
  }

  changeButtonId(buttonId: number) {
    this.selectedButtonId = buttonId;
  }

  setAction(action: string) {
    let key = 'key' + this.selectedButtonId;
    console.log('Action: ' + action + ' Button ID: ' + key);
    const payload = {
      key: key,
      action: action,
    };
    console.log(payload);
    console.log(Backend.url + '/set_api');
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

  /*loginSpotify(){

    this.http.get(Backend.url + '/login', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }).subscribe((data) => {
      console.log(data);
    });

  }*/

  loginSpotify(): void {
    const CLIENT_ID = 'c6e1a2e3479b4890bb1ee4e6a8d69cbe';
    const REDIRECT_URI = 'http://localhost:8000/callback';
    const AUTH_URL = 'https://accounts.spotify.com/authorize';

    const scope = 'user-read-private user-read-email';
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
