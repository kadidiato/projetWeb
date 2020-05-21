import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
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
  public isAuth: boolean;
  public user;
  public type: string;

  constructor(private http: HttpClient, private afAuth: AngularFireAuth,) {
    this.checkAuthState();
  }

  checkAuthState() {
    this.afAuth.auth.onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
          this.type = localStorage.getItem('type');
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  disconnect() {
    this.afAuth.auth.signOut();
    localStorage.removeItem('type');
    this.isAuth = false;
  }

}
