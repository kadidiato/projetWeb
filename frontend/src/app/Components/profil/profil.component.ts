import {Component, OnInit} from '@angular/core';
import {Eleves} from "../../Interface/eleve";
import {AngularFireAuth} from "@angular/fire/auth";
import {ElevesService} from "../../Service/eleves.service";
import {ProfService} from "../../Service/prof.service";
import {Prof} from "../../Interface/Prof";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  eleve: Eleves;
  reservedCours;
  prof: Prof;
  afficherDialog = false;
  userPhoto: Eleves = { // je stock la photo de profil recuperer dans firebase
    photo: '',
  };
  type: string;

  constructor(private afAuth: AngularFireAuth, private elevesService: ElevesService,
              private  profService: ProfService) {
  }

  ngOnInit(): void {
    this.initAuth();
  }

  async initAuth() {
    this.afAuth.user.subscribe(u => {
      if (u) {
        this.type = localStorage.getItem('type');

        if (this.type === 'eleve') {
          this.elevesService.getEleveByid(u.uid).subscribe(res => {
            this.eleve = res;
            this.getReservedCourses();
            this.userPhoto.photo = u.photoURL;
          }, r => {
            console.log('errr' + r);
          });
        } else if (this.type === 'prof') {
          // get du prof
          this.profService.getProfByid(u.uid).subscribe(res => {
            this.prof = res;
            console.log(this.prof);
            this.userPhoto.photo = u.photoURL;
          }, r => {
            console.log('errr' + r);
          });
        }
      }
    });
  }

  afficherDialogProfil() {
    this.afficherDialog = true;
  }

  onHideProfilDialog(): void {
    this.afficherDialog = false;
  }

  /*  getEleveById(id, tableeau) {
      return tableeau.filter((elt) => {
        return elt.id === id;
      });
    }*/

  getReservedCourses() {
    console.log('\ngetReservedCourses');
    console.log(this.eleve);
    this.elevesService.getReservedCourses(this.eleve.id).subscribe((res) => {
      console.log("\n\nres");
      console.log(res);
      this.reservedCours = res;
    });
  }
}
