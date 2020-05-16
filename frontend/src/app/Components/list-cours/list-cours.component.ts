import { Component, OnInit } from '@angular/core';
import {CoursService} from "../../Service/cours.service";

@Component({
  selector: 'app-list-cours',
  templateUrl: './list-cours.component.html',
  styleUrls: ['./list-cours.component.scss']
})
export class ListCoursComponent implements OnInit {

  //liste des variables
    cours: any[];

    constructor(private coursServiece: CoursService) { }

    ngOnInit(): void {
      this.init();
    }
    async init() {
      this.coursServiece.getCoursBe().subscribe(res => {
        console.log('cours reçu ');
        console.log(res);
        this.cours = res;
        console.log(this.cours);
      }, err => {
        console.log('error de recup');
      });
    }
}
