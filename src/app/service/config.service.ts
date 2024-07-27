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

  constructor(private http: HttpClient) {
  }

  toggleConfigHidden() {
    this.hidden.next(!this.hidden.value);
  }

  changeButtonId(buttonId: number) {
    this.selectedButtonId = buttonId;
  }

  setAction(action: string) {
    let key = "key" + this.selectedButtonId
    console.log('Action: ' + action + ' Button ID: ' + key);
    const payload = {
      key: key,
      action: action,
    };
    console.log(payload);
    console.log(Backend.url + '/set_api');
    this.http.post(Backend.url + '/set_api', payload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }).subscribe((data) => {
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

  /* // Metodo per il signup
  public signup(user: any) {
    return this.http.post(Backend.url + '/users/', user);
  }

  // Metodo per il login
  public login(loginDetails: any) {
    return this.http.post(Backend.url + '/authenticate/login', loginDetails)
  }

  // Get api list
  public get_api_list() {
    return this.http.post(Backend.url + '/api')
  }

  // Metodo di per ottenere i dati dell'utente
  public getUser(): Observable<any> {
    return this.http.get(Backend.url + '/users/singleuser/' + localStorage.getItem('id'));
  }

  // Metodo per eliminare l'account
  public deleteUser(): Observable<any> {
    return this.http.delete(Backend.url + '/users/delete/' + localStorage.getItem('id'));
  }

  // Metodo per fare update user
  public updateUser(user) {
    return this.http.put(Backend.url + '/users/update/' + localStorage.getItem('id'), user);
  }

  // Metodo di per ottenere il ranking
  public getRanking(): Observable<any> {
    return this.http.get(Backend.url + '/ranking');
  } */
}
