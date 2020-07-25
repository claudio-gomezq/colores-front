import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Color from "../../../../shared/models/Color";

@Component({
  selector: 'app-color-item[color]',
  templateUrl: './color-item.component.html',
  styleUrls: ['./color-item.component.scss']
})
export class ColorItemComponent implements OnInit {

  @Input() color: Color;

  constructor() { }

  ngOnInit(): void {
  }

}
