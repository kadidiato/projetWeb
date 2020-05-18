import {Component, OnInit} from '@angular/core';
import {Eleves} from "../../Interface/eleve";
import {Prof} from "../../Interface/Prof";
import {AngularFireAuth} from "@angular/fire/auth";
import {ElevesService} from "../../Service/eleves.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  eleves: Eleves[]; // l'utilisateur courant
  eleveId: number;
  eleve: Eleves; // l'utilisateur courant
  prof: Prof; // l'utilisateur courant
  userPhoto: Eleves = { // je stock la photo de profil recuperer dans firebase
    photo: '',
  };

  constructor(private afAuth: AngularFireAuth, private elevesService: ElevesService) {
  }

  ngOnInit(): void {
    this.getAllEleves();
  }

  async init(id: number) {
    await this.afAuth.user.subscribe(u => {
      if (u) {
        console.log(u.uid);
        this.elevesService.getEleveByid(id).subscribe(res => {
          this.eleve = res;
          this.userPhoto.photo = u.photoURL;
        }, r => {
          console.log('errr' + r);
        });
      }
    });
  }

  getAllEleves() {
    this.elevesService.getAllEleve().subscribe(res => {
      this.eleves = res;
      console.log('AllEleve');
      console.log(res);
      console.log(this.eleveId);

      let el = this.getEleveById(1, this.eleves);

      this.eleveId = el.id;
      console.log(this.eleveId);

      console.log('getEleveById');
      console.log(this.getEleveById(1, this.eleves));
      this.init(this.eleveId);
    }, error => {
      console.log(error);
    });
  }

  afficherDialogProfil() {

  }

  getEleveById(id, tableeau) {
    return tableeau.filter((elt) => {
      return elt.id === id;
    });
  }
}
