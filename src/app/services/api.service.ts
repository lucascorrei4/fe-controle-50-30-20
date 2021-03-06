import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { User } from "../models/user";
import { catchError, map } from "rxjs/operators";
import { Lancamento } from "../models/lancamento";
import { StorageService } from "./storage.service";

export interface Item {
  name: string;
  description: string;
  url: string;
  html: string;
  markdown: string;
}

@Injectable({
  providedIn: "root",
})
export class ApiService {
  baseUri: string = "http://localhost:4000/api";
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  fetch(): Observable<Item[]> {
    return <Observable<Item[]>>this.http.get("assets/data/conf.json");
  }

  createUser(data): Observable<any> {
    let url = `${this.baseUri}/create`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  // Get all Users
  getUsers() {
    return this.http.get(`${this.baseUri}`);
  }

  // Get User
  getUser(id): Observable<any> {
    let url = `${this.baseUri}/read/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Update User
  updateUser(id, data): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Delete User
  deleteUser(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
