import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ColorChromeModule} from "ngx-color/chrome";
import {EditableInputModule} from "ngx-color";
import {OverlayModule} from "@angular/cdk/overlay";
import {FlexModule} from "@angular/flex-layout";

import { LoadingButtonComponent } from './components/loading-button/loading-button.component';
import {ColorPickerComponent} from './components/color-picker/color-picker.component';
import {MaterialModule} from "../material.module";


@NgModule({
  declarations: [ColorPickerComponent, LoadingButtonComponent],
    exports: [ColorPickerComponent, LoadingButtonComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ColorChromeModule,
    EditableInputModule,
    OverlayModule,
    FlexModule
  ]
})
export class SharedModule {
}
