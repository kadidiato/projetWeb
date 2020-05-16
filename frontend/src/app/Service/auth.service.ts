import {Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {User} from "../Interface/user";

function AlxToObjectString(data?: object): {[key: string]: string} {
  const res = {};
  for (const k of Object.keys(data || {}) ) {
    const v = data[k];
    res[k] = typeof v === 'string' ? v : JSON.stringify(v);
  }
  return res;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api_redirect = '/back/api';

  constructor(private http: HttpClient) { }
  public user: User;

  private async get<T>(url: string, data: object): Promise<HttpResponse<T>> {
    return this.http.get<T>( url, {
      observe: 'response',
      params: {...AlxToObjectString(data)}
    }).toPromise();
  }
  /**
   * envoie des données de connexion au serveur
   * @param userId
   */
  authentificate(params: {[key: string]: string}): Promise<HttpResponse<string>> {
    const P = new HttpParams( {fromObject: params} );
    return this.http.post( `${this.api_redirect}/utilisateur`, P, {
      observe: 'response',
      responseType: 'text',
      headers: {'content-type': 'application/x-www-form-urlencoded'}
    }).toPromise();
  }


  /**
   * recuperation des données un utilisateur dans la base par son id
   * @param id
   */
  async getUser(id : string): Promise<User> {
    return new Promise<User>(((resolve, reject) => {
      this.http.get(`${this.api_redirect}/utilisateur?id=${id}`, {responseType: 'text'}).toPromise().then(
        res => {
          console.log("utilisateur " + res);
          resolve(JSON.parse(res));
        }, rej => {
          reject(rej);
        }
      );
    }));
  }

}
