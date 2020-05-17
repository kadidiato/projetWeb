import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {Cours} from "../Interface/cours";
import {catchError} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class CoursService {
  api_redirect = '/back/api';

  constructor(private http: HttpClient) {
  }

  /**
   * recuperation tous les  cours
   *
   */
  async getAllCours(): Promise<any[]> {
    return new Promise<any>(((resolve, reject) => {
      this.http.get(`${this.api_redirect}/cours`, {responseType: 'text'}).toPromise().then(
        res => {
          console.log('Tous les cours de base de donnees');
          resolve(res);
        }, rej => {
          reject(rej);
        }
      );
    }));
  }

  getCoursBe(): Observable<any> {
    return this.http.get(`${this.api_redirect}/cours`);
  }

  /**
   * recuperation un cour en connaissant son id tslint:disable-next-line:no-redundant-jsdoc
   * @param__id
   */
  async getCoursById(id: string): Promise<any> {
    return new Promise<any>(((resolve, reject) => {
      this.http.get(`${this.api_redirect}/cours?id=${id}`, {responseType: 'text'}).toPromise().then(
        res => {
          console.log('l id cours' + id);
          resolve(JSON.parse(res));
        }, rej => {
          reject(rej);
        }
      );
    }));
  }


  addCours(cour: Cours): Observable<Cours> {
    return this.http.post<Cours>(`${this.api_redirect}/cours`, cour)
      .pipe(catchError<any, any>(this.handleError));
  }

  /**
   * recuperation un cour en connaissant l'id du professeur
   * @param__id
   */
  async getCoursByProfeseurID(id: string): Promise<Cours> {
    return new Promise<Cours>(((resolve, reject) => {
      this.http.get(`${this.api_redirect}/profs?id=${id}`, {responseType: 'text'}).toPromise().then(
        res => {
          resolve(JSON.parse(res));
        }, rej => {
          reject(rej);
        }
      );
    }));
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}

