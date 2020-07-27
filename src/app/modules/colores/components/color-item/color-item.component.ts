import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Color from "../../../../shared/models/color";
import {AuthService} from "../../../../core/services/auth.service";

@Component({
  selector: 'app-color-item[color]',
  templateUrl: './color-item.component.html',
  styleUrls: ['./color-item.component.scss']
})
export class ColorItemComponent implements OnInit {

  @Input() color: Color;

  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() copy = new EventEmitter<Color>();

  constructor(public authService: AuthService) {
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
