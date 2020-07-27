import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import Color from "../../shared/models/color";
import PaginateResponseModel from "../../shared/models/paginate-response.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ColoresHttpService {

  constructor(private http: HttpClient) {
  }

  public fetchColors(page: number, size: number): Observable<PaginateResponseModel<Color>> {
    const params = new HttpParams({
      fromObject: {page: page.toString(), size: size.toString()}
    });
    return this.http.get<PaginateResponseModel<Color>>(`${environment.apiUrl}/colores`, {
      params
    });
  }

  public fetchOne(colorId: number): Observable<Color> {
    return this.http.get<Color>(`${environment.apiUrl}/colores/${colorId}`);
  }


  public createColor(color: Color): Observable<Color> {
    return this.http.post<Color>(`${environment.apiUrl}/colores`, color);
  }

  public updateColor(colorId: number, color: Color): Observable<Color> {
    return this.http.put<Color>(`${environment.apiUrl}/colores/${colorId}`, color);
  }

  public deleteColor(colorId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/colores/${colorId}`);
  }
}
