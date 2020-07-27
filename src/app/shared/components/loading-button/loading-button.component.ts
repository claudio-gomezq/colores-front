import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.scss']
})
export class LoadingButtonComponent implements OnInit {

  @Input() disabled: boolean;
  @Input() text: string = '';
  @Input() loading: boolean = false;

  @HostBinding('style.pointer-events') get pointerEvent() {
    return this.disabled ? 'none' : '';
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
