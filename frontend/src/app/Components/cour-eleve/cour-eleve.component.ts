import {Component, OnInit} from '@angular/core';
import {CoursService} from "../../Service/cours.service";
import {Cours} from "../../Interface/cours";

@Component({
  selector: 'app-cour-eleve',
  templateUrl: './cour-eleve.component.html',
  styleUrls: ['./cour-eleve.component.scss']
})
export class CourEleveComponent implements OnInit {

  cours: Cours;

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

  reserver() {

  }
}
