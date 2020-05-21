import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from "../../Service/auth.service";
import {Router} from "@angular/router";
import {auth} from "firebase";
import {ElevesService} from "../../Service/eleves.service";
import {Eleves} from "../../Interface/eleve";
import {ProfService} from "../../Service/prof.service";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  eleve: Eleves;
  signInForm: FormGroup;
  errorMessage: any;
  isAuth: boolean;
  type: string;

  constructor(private afAuth: AngularFireAuth, private authService: AuthService,
              private profService: ProfService, private elevesService: ElevesService,
              private formBuilder: FormBuilder, private route: Router) {
    afAuth.user.subscribe(u => console.log('L\'utilisateur est ', u));
  }

  ngOnInit(): void {
    this.initForm();
    this.afAuth.auth.onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  /**
   * login with Google acompt
   */
  loginGoogle() {
    this.type = this.signInForm.get('type').value;
    console.log('type');
    console.log(this.type);
    if (this.type) {
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(
        u => {
          this.route.navigate(['/profil']);
          this.sendToServeur(this.type);
          /*this.message.add({
            severity: 'success',
            summary: `Bienvenue ${u.user.displayName}`,
          });*/
        },
        (error) => {
          this.errorMessage = error;
          /* this.message.add({
             severity: 'error',
             summary: 'Erreur de connexion',
             detail: 'Une erreur est survenue l\'ors de la connexion !'
           });*/
        }
      );
    } else {
      this.errorMessage = 'selectionnez un type';
    }
  }

  // formGroup pour la connexion avec email et le passwod
  initForm() {
    this.signInForm = this.formBuilder.group({
      type: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  /**
   * methode de connexion avec l'email et le mot de pass
   */
  onSubmit() {
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;
    this.type = this.signInForm.get('type').value;
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
      u => {
        this.sendToServeur(this.type);
        /*this.message.add({severity:'success',
          summary:`Bienvenue `,
          detail:'Vous pouvez commander vos films et plats 😁!'});
        this.sendServeur();*/
      },
      (error) => {
        this.errorMessage = error;
        /*this.message.add({severity:'error',
          summary:'Erreur de connexion',
          detail:'Une erreur est survenue l\'ors de la connexion !'});*/
      }
    );
  }

  /**
   * envoie les information du client au serveur il s'atend a recevoir (email qui est obligatoir)
   */
  sendToServeur(type) {
    this.afAuth.user.subscribe(eleve => {
      localStorage.setItem('type', this.type);
      const i = eleve.displayName.indexOf(' '); // couper en 2 displayname pour avoir le prenom et le nom
      if (type === 'eleve') {
        this.elevesService.addEleve({
          // variable que le serveur s'attend a recevoir
          nomEleve: eleve.displayName.substr(0, i),
          prenomEleve: eleve.displayName.substr(i),
          mailEleve: eleve.email,
          photo: eleve.photoURL,
          uid: eleve.uid,
        }).then(data => {
          this.type = '';
        });

        this.route.navigate(['/profil']);
      } else if (type === 'prof') {
        this.profService.addProf({
          // variable que le serveur s'attend a recevoir
          nomProf: eleve.displayName.substr(0, i),
          prenomProf: eleve.displayName.substr(i),
          mailProf: eleve.email,
          photo: eleve.photoURL,
          uid: eleve.uid,
        }).then(data => {
          this.type = '';
        });

        this.route.navigate(['/profil']);
      } else {
        this.afAuth.auth.signOut();
      }
    });
  }

}
