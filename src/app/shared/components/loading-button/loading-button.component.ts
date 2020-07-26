import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.scss']
})
export class LoadingButtonComponent implements OnInit {

  @Input() disabled: boolean;
  @Input() text: string = '';
  @Input() loading: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
