import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/auth";
import {AuthService} from "../../Service/auth.service";
import {MessageService} from "primeng";
import {Router} from "@angular/router";
import {auth} from "firebase";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signinForm: FormGroup;
  private errorMessage: any;

  constructor(
              private afAuth: AngularFireAuth,
              private authService : AuthService,
              private message : MessageService,
              private formBuilder: FormBuilder,
              private route: Router) {
    afAuth.user.subscribe(u => console.log("L'utilisateur est ", u));

    this.signinForm = new FormGroup({
      firstName: new FormControl()
    });

  }

  ngOnInit(): void {
  }
  /**
   * login with Google acompt
   */
  loginGoogle() {
    // @ts-ignore
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(
      u => {
        this.route.navigate(['/']);
        this.message.add({severity:'success',
          summary:`Bienvenue ${u.user.displayName}`,
         });
        this.sendServeur();
      },
      (error) => {
        this.errorMessage = error;
        this.message.add({severity:'error',
          summary:'Erreur de connexion',
          detail:'Une erreur est survenue l\'ors de la connexion !'});
      }
    );
  }

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  /**
   * envoie les information du client au serveur il s'atend a recevoir (id, nom, prenom)
   */
  sendServeur(){
    this.afAuth.user.subscribe(utilisateur =>{
      let i = utilisateur.displayName.indexOf(" "); // couper en 2 displayname pour avoir le prenom et le nom
      if (utilisateur.uid){
        // @ts-ignore
        this.authService.authentificate({
          // variable que le serveur s'attend a recevoir
          idClient: utilisateur.uid,
          nom: utilisateur.displayName.substr(0,i),
          prenom: utilisateur.displayName.substr(i),
          email: utilisateur.email,
          photo: utilisateur.photoURL,
        })
      }
    })


  }




}
