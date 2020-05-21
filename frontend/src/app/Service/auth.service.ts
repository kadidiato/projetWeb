import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../Interface/user";
import {AngularFireAuth} from "@angular/fire/auth";

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

  constructor(private http: HttpClient, private afAuth: AngularFireAuth,) {
  }

  public user: User;

  disconnect() {
    this.afAuth.auth.signOut();
    localStorage.removeItem('type');
  }

}
