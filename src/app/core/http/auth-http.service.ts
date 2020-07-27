import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import User from "../../shared/models/user.model";
import LoginResponse, {LoginBody} from "../../shared/models/login-response";

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {

  private readonly BASE_URL = `${environment.apiUrl}/auth/`;

  constructor(private http: HttpClient) {
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/register`, user);
  }

  public login(loginBody: LoginBody): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.BASE_URL}/login`, loginBody);
  }
}
