import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cours} from "../../../Interface/cours";
import {CoursService} from "../../../Service/cours.service";
import {ProfService} from "../../../Service/prof.service";

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

  status: [0, 1];

  constructor(private coursService: CoursService, private profService: ProfService, private coursServiece: CoursService) {
  }

  ngOnInit(): void {
    this.getAllProfs();
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
      this.coursService.addCours(this.cour).subscribe((response) => {
        this.afficherDialog = false;
        this.getAllcours();
      }, error => {
        console.log(error);
      });

    }

  }

  getAllProfs() {
    this.profService.getAllProf().subscribe((res) => {
      this.profs = [Object.assign([])];
      res.map(c => {
        const elt = {id: c.id, text: c.nomProf + ' ' + c.prenomProf};
        if (this.profs.indexOf(elt) === -1) {
          this.profs.push(elt);
        }
      });
    }, error => {
      console.log(error);
    });
  }
}
