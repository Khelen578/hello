import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/internal/operators';
import { User } from '../models/user';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'localhost:3000/users';

  private isAuth = false;

  constructor(private http: HttpClient) {
    this.isAuth = false;
  }

  getIsAuth() {
    return this.isAuth;
  }

  getUser(login: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + '?login=' + login)
      .pipe(
        retry(1),
        catchError(this.handlError)
      );
  }

  login(login: string, password: string): boolean {
    if (login === 'kiichigo'
      && Md5.hashStr(password) === 'f2b12fb3c6a97fdf60bd25ffb3007a59') {
      this.isAuth = true;
      return true;
    }
  }

  logout() {
    this.isAuth = false;
  }

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
}
