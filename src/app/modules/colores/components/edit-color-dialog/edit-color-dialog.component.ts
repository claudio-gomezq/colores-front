import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import {ColoresHttpService} from "../../../../core/http/colores-http.service";
import {createColor} from "../../../../shared/models/color.model";

@Component({
  selector: 'app-edit-color-dialog',
  templateUrl: './edit-color-dialog.component.html',
  styleUrls: ['./edit-color-dialog.component.scss']
})
export class EditColorDialogComponent implements OnInit {

  editColorForm: FormGroup;
  loading: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: EditColorData,
              private fb: FormBuilder,
              private coloresHttp: ColoresHttpService,
              public dialogRef: MatDialogRef<EditColorDialogComponent>) {
  }

  ngOnInit(): void {
    this.editColorForm = this.fb.group({
      color: []
    });
    this.loadColor();
  }

  loadColor() {
    this.coloresHttp.fetchOne(this.data.colorId).subscribe(color => {
      delete color.id;
      this.editColorForm.get('color').setValue(color);
    })
  }

  public edit() {
    const color = createColor(this.editColorForm.get('color').value);
    this.loading = true;
    this.coloresHttp.updateColor(this.data.colorId, color).subscribe((updatedColor) => {
      this.loading = false;
      this.dialogRef.close(updatedColor);
    });
  }
}

export interface EditColorData {
  colorId: number;
}
