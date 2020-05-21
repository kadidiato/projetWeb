import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {AuthService} from "../../Service/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, private route: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.checkAuthState();
  }


  onSignOut() {
    this.authService.disconnect();
    this.route.navigate(['/sign-in']);
  }

}
