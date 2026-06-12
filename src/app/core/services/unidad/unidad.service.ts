import { Injectable } from '@angular/core';
import { catchError, Subject, tap } from 'rxjs';
import { Unidad } from '../../../models/unidad';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HandleErrorService } from '../error/handle-error.service';

@Injectable({
  providedIn: 'root',
})
export class UnidadService {
   route = `${environment.apiUrl}/unidad`;
  private _refreshListUnidad$ = new Subject<Unidad | null>();

 

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) { }


  get refreshListUnidad() {
    return this._refreshListUnidad$;
  }

  getById(id: number) {
    return this.http.get<Unidad>(`${this.route}/obtener-por-id/${id}`);
  }

  getAll() {
    return this.http.get<Unidad[]>(`${this.route}/obtener-todos`);
  }

  post(dto: Unidad) {
    return this.http.post<Unidad>(`${this.route}/crear`, dto)
      .pipe(
        tap(() => {
          this._refreshListUnidad$.next(null);
        }),
        catchError(this.handleErrorService.handleError)
      );
  }

  put(id: number, dto: Unidad) {
    return this.http.put<Unidad>(`${this.route}/actualizar/${id}`, dto)
      .pipe(
        tap(() => {
          this._refreshListUnidad$.next(null);
        }),
        catchError(this.handleErrorService.handleError)
      );
  }

  delete(id: number) {
    return this.http.delete(`${this.route}/eliminar/${id}`)
      .pipe(
        tap(() => {
          this._refreshListUnidad$.next(null);
        }),
        catchError(this.handleErrorService.handleError)
      );
  }
}
