import {Component, OnInit} from '@angular/core';
import {CoursService} from "../../Service/cours.service";
import {Cours} from "../../Interface/cours";

@Component({
  selector: 'app-list-cours',
  templateUrl: './historique-cours.component.html',
  styleUrls: ['./historique-cours.component.scss']
})
export class HistoriqueCoursComponent implements OnInit {

  cours: Cours;
  afficherDialog = false;

  courSelectionne: Cours;

  constructor(private coursServiece: CoursService) {
  }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.coursServiece.getCoursBe().subscribe(res => {
      this.cours = res;
      console.log(this.cours);
    }, err => {
      console.log('error de recup');
    });
  }

  ajoutNewCour(): void {
    this.courSelectionne = new Cours();
    this.afficherDialog = true;
  }

  /**
   * fermeture du dialog pop up
   */
  onHideProfilDialog($event): void {
    console.log('Event result');
    console.log($event);
    this.afficherDialog = false;
    if ($event) {
      this.init();
    }
  }


  modificationCour(cour: Cours) {
    this.courSelectionne = cour;
    this.afficherDialog = true;
  }
}
