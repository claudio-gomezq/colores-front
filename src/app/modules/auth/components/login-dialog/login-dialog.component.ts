import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../core/services/auth.service";
import {MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "../../../../core/services/message.service";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  private form: FormGroup;

  loading = false;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<LoginDialogComponent>,
              private messageService: MessageService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX_VALIDATOR)]],
      password: ['', [Validators.required]],
    })
  }

  public login() {
    const {email, password} = this.form.value;
    this.loading = true;
    this.authService.login({
      email, password
    }).subscribe(() => {
      this.loading = false;
      this.dialogRef.close();
      this.messageService.showInfo('Usuario conectado correctamente');
    }, e => {
      this.loading = false;
      const err = e.error;
      if (typeof err === 'object' && err.hasOwnProperty('message')) {
        this.messageService.showError(err.message);
        return;
      }
      this.messageService.showError('Error del servidor');
    });
  }

  public get f(): FormGroup {
    return this.form;
  }
}

//Nota: no utilizo el validador por defecto de Angular(Validators.email),
// porque tiene problemas con el validador de email de la API
export const EMAIL_REGEX_VALIDATOR = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
