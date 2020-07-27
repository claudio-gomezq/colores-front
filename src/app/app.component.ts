import {Component} from '@angular/core';
import {AuthService} from "./core/services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {LoginDialogComponent} from "./modules/auth/components/login-dialog/login-dialog.component";
import {RegisterDialogComponent} from "./modules/auth/components/register-dialog/register-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public authService: AuthService,
              private dialog: MatDialog) {
  }

  openLoginDialog(){
    this.dialog.open(LoginDialogComponent, {
      panelClass: 'responsive-dialog',
    });
  }

  openRegisterDialog(){
    this.dialog.open(RegisterDialogComponent, {
      panelClass: 'responsive-dialog',
    });
  }
  logout(){
    this.authService.logout();
  }
}
