import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ColoresHttpService} from "../../../../core/http/colores-http.service";
import {EditColorData} from "../edit-color-dialog/edit-color-dialog.component";

@Component({
  selector: 'app-delete-color-dialog',
  templateUrl: './delete-color-dialog.component.html',
  styleUrls: ['./delete-color-dialog.component.scss']
})
export class DeleteColorDialogComponent implements OnInit {

  loading = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: EditColorData,
              private coloresHttp: ColoresHttpService,
              public dialogRef: MatDialogRef<DeleteColorDialogComponent>) {
  }

  ngOnInit(): void {
  }

  delete() {
    this.loading = true;
    this.coloresHttp.deleteColor(this.data.colorId).subscribe(()=> {
      this.dialogRef.close(this.data.colorId);
      this.loading = false;
    })
  }
}
