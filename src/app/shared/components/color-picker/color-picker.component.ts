import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  ViewChild
} from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {CdkConnectedOverlay} from "@angular/cdk/overlay";
import {Subscription} from "rxjs";
import {ColorEvent} from "ngx-color/color-wrap.component";

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements AfterViewInit, OnDestroy {

  @ViewChild('overlay') overlay: CdkConnectedOverlay;

  @Input() set control(control: AbstractControl) {
    this._control = control;
    this._value = control.value ?? '';

    this.controlValueSub = this._control.valueChanges.subscribe(value => {
      this._value = value;
    });
  }

  private _value: string;
  private _control: AbstractControl;
  private backdropSub: Subscription;
  private controlValueSub: Subscription;

  public showColorPicker = false;

  constructor() {
  }

  ngAfterViewInit() {
    this.backdropSub = this.overlay.backdropClick.subscribe(() => {
      this.showColorPicker = false;
    })
  }

  ngOnDestroy() {
    this.backdropSub.unsubscribe();
    this.controlValueSub.unsubscribe();
  }

  clickColor() {
    this.showColorPicker = !this.showColorPicker;
  }

  onColorChange(event: ColorEvent) {
    this._control.setValue(event.color.hex);
    this._value = event.color.hex;
  }

  public get value() {
    return this._value;
  }
}
