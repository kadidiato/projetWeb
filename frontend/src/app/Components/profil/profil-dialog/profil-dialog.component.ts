import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cours} from "../../../Interface/cours";
import {Eleves} from "../../../Interface/eleve";
import {ElevesService} from "../../../Service/eleves.service";
import {Prof} from "../../../Interface/Prof";
import {ProfService} from "../../../Service/prof.service";

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

  type: string;

  constructor(private elevesService: ElevesService, private profService: ProfService) {
  }

  ngOnInit(): void {
  }

  onHide(): void {
    this.onDialogHide.emit();
  }

  ajouterEleve() {
    this.type = localStorage.getItem('type');
    if (this.type === 'eleve') {
      this.elevesService.updateEleve(this.eleve).subscribe((response) => {
        this.eleve = response;
        this.afficherDialog = false;
        console.log(this.eleve);
      }, error => {
        console.log(error);
      });
    } else {

    }


  }
}
