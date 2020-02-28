import { Injectable } from '@angular/core';
import { Biscuit } from '../models/biscuit';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class BiscuitService {

  public biscuits: Biscuit[];
  public currentType: string;
  public categories = ['beurre', 'chocolat', 'fourrage anko', 'caramel', 'praliné'];
  beautyDisplay = true;
  // l'url de mon api
  apiUrl = 'http://93.29.84.137:3000/biscuits';
  apiUrlOffline = 'http://localhost:3000/biscuits';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  setCurrentType(type: string) {
    this.currentType = type;
  }

  getCurrentType(): string {
    return this.currentType;
  }

  // j'injecte le service angular HttpClient
  constructor(private toastr: ToastrService, private http: HttpClient) {
    this.biscuits = [];
  }

  addBiscuit(newBiscuit: Biscuit): Observable<Biscuit> {
    return this.http.post<Biscuit>(this.apiUrl, newBiscuit, this.httpOptions).pipe(
      catchError(this.handlError)
    );
  }

  getBiscuits(): Observable<Biscuit[]> {
    return this.http.get<Biscuit[]>(this.apiUrl)
      .pipe(
        retry(1),
        catchError(this.handlError)
      );
  }

  getBiscuitById(id: number): Observable<Biscuit> {
    return this.http.get<Biscuit>(this.apiUrl + '/' + id).pipe(
      retry(1),
      catchError(this.handlError)
    );
  }

  editBiscuit(monBiscuit: Biscuit) {
    return this.http.put<Biscuit>(this.apiUrl + '/' + monBiscuit.id, monBiscuit, this.httpOptions).pipe(
      catchError(this.handlError)
    );

  }

  deleteBiscuit(id: number): Observable<Biscuit> {
    return this.http.delete<Biscuit>(this.apiUrl + '/' + id).pipe(
      retry(1),
      catchError(this.handlError)
    );
  }

  getDisplay() {
    return this.beautyDisplay;
  }

  changeDisplay(): boolean {
    this.beautyDisplay = !this.beautyDisplay;
    return this.beautyDisplay;
  }

  getBiscuitCategories(): string[] {
    return this.categories;
  }

  // gestion des erreurs
  handlError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  showToast(message: string, title: string, type: number) {
    switch (type) {
      case 1:
        this.toastr.success(message, title, {
          closeButton: true
        });
        break;
      case 2:
        this.toastr.info(message, title, {
          closeButton: true
        });
        break;
      case 3:
        this.toastr.error(message, title, {
          closeButton: true
        });
        break;
    }

  }
}
