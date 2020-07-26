import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import ColorModel from "../../shared/models/color.model";
import PaginateResponseModel from "../../shared/models/paginate-response.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ColoresHttpService {

  constructor(private http: HttpClient) {
  }

  public fetchColors(page: number, size: number): Observable<PaginateResponseModel<ColorModel>> {
    const params = new HttpParams({
      fromObject: {page: page.toString(), size: size.toString()}
    });
    return this.http.get<PaginateResponseModel<ColorModel>>(`${environment.apiUrl}/colores`, {
      params
    });
  }

  public fetchOne(colorId: number): Observable<ColorModel> {
    return this.http.get<ColorModel>(`${environment.apiUrl}/colores/${colorId}`);
  }


  public createColor(color: ColorModel): Observable<ColorModel> {
    return this.http.post<ColorModel>(`${environment.apiUrl}/colores`, color);
  }

  public updateColor(colorId: number, color: ColorModel): Observable<ColorModel> {
    return this.http.put<ColorModel>(`${environment.apiUrl}/colores/${colorId}`, color);
  }

  public deleteColor(colorId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/colores/${colorId}`);
  }
}
