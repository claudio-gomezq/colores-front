import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";

import PaginateResponse from "../../shared/models/PaginateResponse";
import Color from "../../shared/models/Color";
import {ColoresPaginationService} from "../../core/services/colores-pagination.service";

@Component({
  selector: 'app-colores',
  templateUrl: './colores.component.html',
  styleUrls: ['./colores.component.scss']
})
export class ColoresComponent implements OnInit {

  public coloresObservable$: Observable<PaginateResponse<Color>>;

  constructor(private coloresPaginationService: ColoresPaginationService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.coloresObservable$ = this.coloresPaginationService.coloresObservable$;
  }

  onSelectPage(event: PageEvent){
    this.coloresPaginationService.moveToPage(event.pageIndex + 1);
    this.coloresPaginationService.changePageSize(event.pageSize);
  }

}
