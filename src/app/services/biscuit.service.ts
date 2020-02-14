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
  public categories = ['beurre', 'chocolat', 'fourrage anko', 'caramel'];
  beautyDisplay = true;
  // l'url de mon api
  apiUrl = 'http://localhost:3000/biscuits';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // j'injecte le service angular HttpClient
  constructor(private toastr: ToastrService, private http: HttpClient) {
    this.biscuits = [];
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

  getDisplay() {
    return this.beautyDisplay;
  }

  changeDisplay() {
    this.beautyDisplay = !this.beautyDisplay;
  }

  addBiscuit(newBiscuit: Biscuit): Observable<Biscuit> {
    return this.http.post<Biscuit>(this.apiUrl, newBiscuit, this.httpOptions).pipe(
      catchError(this.handlError)
    );
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

  deleteBiscuit(id: number): Observable<Biscuit> {
    return this.http.delete<Biscuit>(this.apiUrl + '/' + id).pipe(
      retry(1),
      catchError(this.handlError)
    );
  }

  getBiscuitByIdTheOldWay(id: number): Biscuit {
    return this.biscuits.filter(biscuit => biscuit.id === id)[0];
  }

  getBiscuits(): Observable<Biscuit[]> {
    return this.http.get<Biscuit[]>(this.apiUrl)
      .pipe(
        retry(1),
        catchError(this.handlError)
      );
  }

  getBiscuitById(id: number): Observable<Biscuit> {
    return this.http.get<Biscuit>(this.apiUrl + '/' + id)
      .pipe(
        retry(1),
        catchError(this.handlError)
      );
  }

  getBiscuitsByName(name: string) {
    if (name != null) {
      return this.biscuits.filter(biscuit => biscuit.nom.toUpperCase() === name.toUpperCase());
    }
  }

  getBiscuitsByCategorie(categorie: string): Biscuit[] {
    return this.biscuits.filter(biscuit => biscuit.categorie === categorie);
  }

  editBiscuit(monBiscuit: Biscuit) {
    return this.http.put<Biscuit>(this.apiUrl + '/' + monBiscuit.id, monBiscuit, this.httpOptions).pipe(
      catchError(this.handlError)
    );

  }

  getBiscuitCategories(): string[] {
    return this.categories;
  }
}
