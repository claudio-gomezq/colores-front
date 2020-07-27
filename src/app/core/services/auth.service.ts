import {Injectable} from '@angular/core';
import {BehaviorSubject, EMPTY, empty, Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {AuthHttpService} from "../http/auth-http.service";
import User from "../../shared/models/user.model";
import {LoginBody} from "../../shared/models/login-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSub = new BehaviorSubject<User>(null);
  public currentUser$ = this.currentUserSub.asObservable();

  private currentTokenSub = new BehaviorSubject<string>(null);
  public currentToken$ = this.currentUserSub.asObservable();

  constructor(private authHttp: AuthHttpService) {
    this.init();
  }

  private init() {
    const jsonUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!jsonUser || !token) {
      return;
    }
    this.setUser(JSON.parse(jsonUser));
    this.setToken(token);
  }

  public login(loginBody: LoginBody): Observable<void> {
    return this.authHttp.login(loginBody).pipe(
      map(loginResponse => {
        this.setUser(loginResponse.user);
        this.setToken(loginResponse.token);

        localStorage.setItem('user', JSON.stringify(loginResponse.user));
        localStorage.setItem('token', loginResponse.token);
        return;
      })
    )
  }

  public register(user: User): Observable<User> {
    return this.authHttp.register(user);
  }


  public logout() {
    this.currentTokenSub.next(null);
    this.currentUserSub.next(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }


  public get isAdmin(): boolean {
    return this.user && this.user.type === 'admin';
  }

  public get isLogged(): boolean {
    return this.token !== null;
  }

  public get user(): User {
    return this.currentUserSub.value;
  }

  public get token(): string {
    return this.currentTokenSub.value;
  }

  private setToken(token: string) {
    this.currentTokenSub.next(token);
  }

  private setUser(user: User) {
    this.currentUserSub.next(user);
  }
}
