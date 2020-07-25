import {Component, Input, OnInit} from '@angular/core';
import Color from "../../../../shared/models/Color";

@Component({
  selector: 'app-colores-list',
  templateUrl: './colores-list.component.html',
  styleUrls: ['./colores-list.component.scss']
})
export class ColoresListComponent implements OnInit {
  @Input() colores: Color[];

  constructor() { }

  ngOnInit(): void {
  }

}
