import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Disponibilite} from "../../../Interface/disponibilite";
import {DisponibiliteService} from "../../../Service/disponibilite.service";
import {MessageService} from "primeng";
import {AuthService} from "../../../Service/auth.service";

@Component({
  selector: 'app-add-dispo-dialog',
  templateUrl: './add-dispo-dialog.component.html',
  styleUrls: ['./add-dispo-dialog.component.scss']
})
export class AddDispoDialogComponent implements OnInit {

  dispo: Disponibilite;
  @Input() showDialog = false;
  @Output() onDialogHide = new EventEmitter(true);

  constructor(private dispoService: DisponibiliteService, private msgService: MessageService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.dispo = new Disponibilite();
  }

  addDispo() {
    this.dispo.profId = this.authService.user.id;
    this.dispoService.addDispo(this.dispo).subscribe((res) => {
      this.showDialog = false;
      this.msgService.add({
        severity: 'success', summary: 'Nouvelle disponibilité',
        detail: 'Votre nouvelle dispo a été prise en compte'
      });
    }, error => {
      console.log('error while posting dispo');
      console.log(error);
      this.msgService.add({
        severity: 'error', summary: 'Nouvelle disponibilité',
        detail: `Une erreur est survenue lors de l'enregistrement de la nouvelle disponibilité`
      });
    })
  }

  onHide(): void {
    this.onDialogHide.emit();
  }
}
