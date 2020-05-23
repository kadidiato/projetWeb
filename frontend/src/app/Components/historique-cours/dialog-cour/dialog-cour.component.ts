import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cours} from "../../../Interface/cours";
import {CoursService} from "../../../Service/cours.service";
import {ProfService} from "../../../Service/prof.service";
import {AuthService} from "../../../Service/auth.service";

@Component({
  selector: 'app-dialog-cour',
  templateUrl: './dialog-cour.component.html',
  styleUrls: ['./dialog-cour.component.scss']
})
export class DialogCourComponent implements OnInit {

  profs: [{ id: number, text: string }];
  // cours: Cours;

  @Input() cour: Cours;

  @Input() afficherDialog = false;

  @Output() onDialogHide = new EventEmitter(true);

  titreDialog: string;

  constructor(private coursService: CoursService, private profService: ProfService, private coursServiece: CoursService,
              protected authService: AuthService) {
  }

  ngOnInit(): void {
    if (!this.modeModification()) {
      this.cour.status = -1;
    }
  }

  onHide(): void {
    this.onDialogHide.emit();
  }

  modeModification(): boolean {
    return this.cour.id !== undefined
  }

  private setTitreDialog(): void {
    setTimeout(() => {
      if (this.modeModification()) {
        this.titreDialog = `Modification du cour ${this.cour.matiere}`;
      } else {
        this.titreDialog = `Ajout d'un nouveau cour`;
      }
    })

  }

  onShow(): void {
    this.setTitreDialog();
  }

  async getAllcours() {
    this.coursServiece.getCoursBe().subscribe(res => {
    }, err => {
      console.log('error de recup');
    });
  }

  valider(): void {
    if (this.modeModification()) {
      this.coursService.updateCour(this.cour).subscribe(response => {
        this.afficherDialog = false;
        this.getAllcours();
      }, error => {

      })
    } else {
      this.cour.profId = this.authService.user.id;
      console.log('le cours à creer');
      console.log(this.cour);
      if (0) {
        this.coursService.addCours(this.cour).subscribe((response) => {
          this.afficherDialog = false;
          this.getAllcours();
        }, error => {
          console.log(error);
        });
      }
    }

  }
}
