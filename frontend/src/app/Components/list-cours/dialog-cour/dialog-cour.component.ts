import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cours} from "../../../Interface/cours";

@Component({
  selector: 'app-dialog-cour',
  templateUrl: './dialog-cour.component.html',
  styleUrls: ['./dialog-cour.component.scss']
})
export class DialogCourComponent implements OnInit {

  /**
   * reference vers l'utilisateur
   */
  @Input() cour: Cours;

  /**
   * boolean pour afficher le dialog
   */
  @Input() afficherDialog = false;

  /**
   * evenement après la fermeture du dialog
   */
  @Output() onDialogHide = new EventEmitter(true);
  typesProf: [1, 2];

  constructor() {
  }

  ngOnInit(): void {
  }

  onHide(): void {
    this.onDialogHide.emit();
  }

  ajouterCour(cour: Cours) {

  }
}
