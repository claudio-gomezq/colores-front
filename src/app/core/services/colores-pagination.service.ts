import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest} from "rxjs";
import {switchMap} from "rxjs/operators";
import {ColoresHttpService} from "../http/colores-http.service";
import PaginateResponseModel from "../../shared/models/paginate-response.model";
import ColorModel from "../../shared/models/color.model";


@Injectable({
  providedIn: 'root'
})
export class ColoresPaginationService {

  private coloresResponse = new BehaviorSubject<PaginateResponseModel<ColorModel>>(null);
  public coloresObservable$ = this.coloresResponse.asObservable();

  private currentPageSubject = new BehaviorSubject<number>(1);
  public currentPageObservable$ = this.currentPageSubject.asObservable();

  private currentPageSize = new BehaviorSubject<number>(6);
  public currentPageSizeObservable$ = this.currentPageSize.asObservable();


  constructor(private coloresService: ColoresHttpService) {
    this.init();
  }

  public init(): void {
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

  /**
   * Este metodo se utiliza para refrescar la pagina cuando exista una actualizacion en la lista
   * (crear, eliminar o editar).
   */
  public refreshPage(action: ActionRefresh, color?: ColorModel) {

    switch (action) {
      case 'add':
        if (this.currentPage === 1) {
          const colores = this.coloresResponse.value.items;
          if (colores.length === this.pageSize) {
            colores.pop();
          }
          this.addItem(color, colores);
          return;
        }
        this.moveToPage(1);
        break;
      case 'edit':
        this.updateItem(color, this.coloresResponse.value.items);
        break;
      case 'remove':
        const colores = this.coloresResponse.value.items;
        if (colores.length === 1 && this.currentPage !== 1) {
          this.moveToPage(this.currentPage - 1);
          return;
        }
        this.moveToPage(this.currentPage);
        break;
    }
  }

  public moveToPage(page: number) {
    this.currentPageSubject.next(page);
  }

  public changePageSize(size: number) {
    this.currentPageSize.next(size);
  }

  private addItem(color: ColorModel, colores: ColorModel[]) {
    this.coloresResponse.next({
      ...this.coloresResponse.value,
      totalItems: this.coloresResponse.value.totalItems + 1,
      items: [color, ...colores]
    });
  }

  private updateItem(color: ColorModel, colores: ColorModel[]) {
    this.coloresResponse.next({
      ...this.coloresResponse.value,
      items: [...colores.map(item => item.id === color.id ? color : item)]
    });
  }

  public get pageSize(): number {
    return this.currentPageSize.value;
  }

  public get currentPage(): number {
    return this.currentPageSubject.value;
  }
}

type ActionRefresh = 'add' | 'remove' | 'edit';
