import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";

import PaginateResponseModel from "../../shared/models/paginate-response.model";
import Color from "../../shared/models/color";
import {ColoresPaginationService} from "../../core/services/colores-pagination.service";
import {CreateColorDialogComponent} from "./components/create-color-dialog/create-color-dialog.component";
import {
  EditColorDialogComponent
} from "./components/edit-color-dialog/edit-color-dialog.component";
import {DeleteColorDialogComponent} from "./components/delete-color-dialog/delete-color-dialog.component";
import {AuthService} from "../../core/services/auth.service";
import {LoginDialogComponent} from "../auth/components/login-dialog/login-dialog.component";

@Component({
  selector: 'app-colores',
  templateUrl: './colores.component.html',
  styleUrls: ['./colores.component.scss']
})
export class ColoresComponent implements OnInit {

  public coloresObservable$: Observable<PaginateResponseModel<Color>>;

  public currentPage$: Observable<number>;

  constructor(private coloresPaginationService: ColoresPaginationService,
              public authService: AuthService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.coloresObservable$ = this.coloresPaginationService.coloresObservable$;
    this.currentPage$ = this.coloresPaginationService.currentPageObservable$;
  }

  onSelectPage(event: PageEvent) {
    this.coloresPaginationService.moveToPage(event.pageIndex + 1);
    this.coloresPaginationService.changePageSize(event.pageSize);
  }

  openLoginDialog(){
    this.dialog.open(LoginDialogComponent, {
      panelClass: 'responsive-dialog',
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateColorDialogComponent, {
      panelClass: 'responsive-dialog',
    });
    dialogRef.afterClosed().subscribe(color => {
      if (color) {
        this.coloresPaginationService.refreshPage('add', color);
      }
    });
  }

  openEditDialog(event: number): void {
    const dialogRef = this.dialog.open(EditColorDialogComponent, {
      data: {colorId: event},
      panelClass: 'responsive-dialog',
    });
    dialogRef.afterClosed().subscribe(color => {
      if (color) {
        this.coloresPaginationService.refreshPage('edit', color);
      }
    });
  }

  openDeleteDialog(event: number): void {
    const dialogRef = this.dialog.open(DeleteColorDialogComponent, {
      data: {colorId: event},
      panelClass: 'responsive-dialog',
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.coloresPaginationService.refreshPage('remove');
      }
    });
  }

}
