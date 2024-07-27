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

  loginSpotify(){

    this.http.get(Backend.url + '/login', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }).subscribe((data) => {
      console.log(data);
    });


  }


}
