import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Subject} from "rxjs";
import {ColoresService} from "../http/colores.service";
import {switchMap} from "rxjs/operators";

import PaginateResponse from "../../shared/models/PaginateResponse";
import Color from "../../shared/models/Color";

@Injectable({
  providedIn: 'root'
})
export class ColoresPaginationService {

  private coloresResponse = new Subject<PaginateResponse<Color>>();
  public coloresObservable$ = this.coloresResponse.asObservable();

  private currentPage = new BehaviorSubject<number>(1);
  public currentPageObservable$ = this.currentPage.asObservable();

  private currentPageSize = new BehaviorSubject<number>(6);
  public currentPageSizeObservable$ = this.currentPageSize.asObservable();


  constructor(private coloresService: ColoresService) {
    this.init();
  }

  public init(): void{
    combineLatest([
      this.currentPageObservable$,
      this.currentPageSizeObservable$
    ]).pipe(
      switchMap(([page, size]) => this.fetchPage(page, size))
    ).subscribe(response => {
      this.coloresResponse.next(response);
    });
  }

  private fetchPage(page: number, size: number) {
    return this.coloresService.fetchColors(page, size);
  }

  public moveToPage(page: number){
    this.currentPage.next(page);
  }

  public changePageSize(size: number){
    this.currentPageSize.next(size);
  }
}
