import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import {ColoresComponent} from './colores.component';
import {MaterialModule} from "../../material.module";
import {SharedModule} from "../../shared/shared.module";
import {ColoresListComponent} from './components/colores-list/colores-list.component';
import {ColorFormComponent} from './components/color-form/color-form.component';
import {CreateColorDialogComponent} from './components/create-color-dialog/create-color-dialog.component';
import {ColorItemComponent} from "./components/color-item/color-item.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {path: '', component: ColoresComponent},
];

@NgModule({
  declarations: [
    ColoresComponent,
    ColoresListComponent,
    ColorFormComponent,
    CreateColorDialogComponent,
    ColorItemComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    CreateColorDialogComponent
  ],
})
export class ColoresModule {
}
