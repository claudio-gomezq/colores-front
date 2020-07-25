import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import Color from "../../shared/models/Color";
import PaginateResponse from "../../shared/models/PaginateResponse";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ColoresService {

  constructor(private http: HttpClient) {
  }

  public fetchColors(page: number, size: number): Observable<PaginateResponse<Color>> {
    const params = new HttpParams({
      fromObject: {page: page.toString(), size: size.toString()}
    });
    return this.http.get<PaginateResponse<Color>>(`${environment.apiUrl}/colores`, {
      params
    });
  }
}
