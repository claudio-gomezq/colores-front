import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import ColorModel from "../../../../shared/models/color.model";

@Component({
  selector: 'app-color-item[color]',
  templateUrl: './color-item.component.html',
  styleUrls: ['./color-item.component.scss']
})
export class ColorItemComponent implements OnInit {

  @Input() color: ColorModel;

  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() copy = new EventEmitter<ColorModel>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onEdit() {
    this.edit.emit(this.color.id);
  }

  onDelete() {
    this.delete.emit(this.color.id);
  }

  onCopy() {
    this.copy.emit(this.color);
  }

}
