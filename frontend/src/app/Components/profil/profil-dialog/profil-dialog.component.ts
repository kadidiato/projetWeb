import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cours} from "../../../Interface/cours";
import {Eleves} from "../../../Interface/eleve";
import {ElevesService} from "../../../Service/eleves.service";
import {Prof} from "../../../Interface/Prof";

@Component({
  selector: 'app-profil-dialog',
  templateUrl: './profil-dialog.component.html',
  styleUrls: ['./profil-dialog.component.scss']
})
export class ProfilDialogComponent implements OnInit {

  /**
   * reference vers l'utilisateur
   */
  @Input() eleve: Eleves;
  @Input() prof: Prof;

  /**
   * boolean pour afficher le dialog
   */
  @Input() afficherDialog = false;

  /**
   * evenement après la fermeture du dialog
   */
  @Output() onDialogHide = new EventEmitter(true);

  constructor(private elevesService: ElevesService) {
  }

  ngOnInit(): void {
  }

  onHide(): void {
    this.onDialogHide.emit();
  }

  ajouterEleve() {
    this.elevesService.updateEleve(this.eleve).subscribe((response) => {
      this.eleve = response;
      this.afficherDialog = false;
      console.log(this.eleve);
    }, error => {
      console.log(error);
    });

  }
}
