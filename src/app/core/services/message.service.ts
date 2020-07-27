import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private matSnackBar: MatSnackBar) { }

  public showError(message: string){
    this.matSnackBar.open(message, 'OK', {
      panelClass: 'snackbar-error',
      duration: 1000
    });
  }

  public showInfo(message: string){
    this.matSnackBar.open(message, 'cerrar', {
      duration: 850
    });
  }
}
