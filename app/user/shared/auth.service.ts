import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { LocalStorageService} from 'ngx-webstorage'
import { logging } from 'protractor';
import { SignInRequestPayload } from '../sign-in/signin-request.payload';
import { Observable } from 'rxjs';
import { SignInResponse } from '../sign-in/sigin-response.payload';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
    private localStorage: LocalStorageService) { 

    }

    login(signInRequestPayload: SignInRequestPayload): Observable<boolean> {
      return this.httpClient.post<SignInResponse>('https://reqres.in/api/login', signInRequestPayload)
        .pipe(map(data => {
          this.localStorage.store('token', data.token);
          return true;
        }));
    }
}
