import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Clipboard} from "@angular/cdk/clipboard";
import {MatSnackBar} from "@angular/material/snack-bar";
import ColorModel from "../../../../shared/models/color.model";

@Component({
  selector: 'app-colores-list',
  templateUrl: './colores-list.component.html',
  styleUrls: ['./colores-list.component.scss']
})
export class ColoresListComponent implements OnInit {
  @Input() colores: ColorModel[];

  @Output() editItem = new EventEmitter<number>();
  @Output() deleteItem = new EventEmitter<number>();

  constructor(private clipboard: Clipboard,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  copyColor(event: ColorModel){
    const success = this.clipboard.copy(event.color)
    if(success){
      this.snackBar.open('ColorModel copiado!', 'Cerrar', {
        duration: 800
      });
    }
  }

  trackByFn(index, item: ColorModel) {
    return item.id;
  }

}
