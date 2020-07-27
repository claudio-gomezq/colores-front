import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "../../../../core/services/message.service";
import {AuthService} from "../../../../core/services/auth.service";
import {EMAIL_REGEX_VALIDATOR} from "../login-dialog/login-dialog.component";
import {createUser} from "../../../../shared/models/user.model";

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {

  private form: FormGroup;

  loading = false;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<RegisterDialogComponent>,
              private messageService: MessageService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX_VALIDATOR)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, matchValidator('password')]],
      type: ['normal', [Validators.required]],
    })
  }

  public register() {
    const {name, email, password, type} = this.form.value;
    const user = createUser({name, email, password, type});
    this.loading = true;
    this.authService.register(user).subscribe(() => {
      this.loading = false;
      this.messageService.showInfo('Usuario registrado exitosamente!')
      this.dialogRef.close();
    }, (e) => {
      this.loading = false;
      const err = e.error;
      if (typeof err === 'object' && err.hasOwnProperty('message')) {
        this.messageService.showError(err.message);
        return;
      }
      console.warn(err);
      this.messageService.showError('Error del servidor');
    });
  }

  public get f(): FormGroup {
    return this.form;
  }
}

function matchValidator(matchControlName): ValidatorFn {
  return (control: FormControl) => {

    const matchValue = control.parent?.get(matchControlName)?.value ?? null;
    const controlValue = control.value;

    if (matchValue === null || !controlValue) {
      return null;
    }
    return controlValue === matchValue ? null : {notMatch: true}
  }
}
