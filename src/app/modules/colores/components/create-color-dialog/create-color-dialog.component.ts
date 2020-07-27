import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

import {ColoresHttpService} from "../../../../core/http/colores-http.service";
import {createColor} from "../../../../shared/models/color";

@Component({
  selector: 'app-create-color-dialog',
  templateUrl: './create-color-dialog.component.html',
  styleUrls: ['./create-color-dialog.component.scss']
})
export class CreateColorDialogComponent implements OnInit {

  createColorForm: FormGroup;

  loading = false;

  constructor(private fb: FormBuilder,
              private coloresService: ColoresHttpService,
              public dialogRef: MatDialogRef<CreateColorDialogComponent>) {
  }

  ngOnInit(): void {
    this.createColorForm = this.fb.group({
      color: [{
        year: new Date().getFullYear(),
        name: '',
        color: '',
        pantone: '',
      }]
    });
  }

  public create() {
    const color = createColor(this.createColorForm.get('color').value);
    this.loading = true;
    this.coloresService.createColor(color).subscribe((createdColor) => {
      this.loading = false;
      this.dialogRef.close(createdColor);
    });
  }

}
