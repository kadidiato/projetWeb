import {Component, OnInit} from '@angular/core';
import {CoursService} from "../../Service/cours.service";
import {Cours} from "../../Interface/cours";
import {ReservationService} from "../../Service/reservation.service";
import {Reservation} from "../../Interface/Reservation";

@Component({
  selector: 'app-cour-eleve',
  templateUrl: './cour-eleve.component.html',
  styleUrls: ['./cour-eleve.component.scss']
})
export class CourEleveComponent implements OnInit {

  cours: Cours;
  reservation: Reservation;

  constructor(private coursServiece: CoursService,
              private reservationService: ReservationService) {
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

  reserver(cours) {
    this.reservation = {
      coursId: cours,
      eleveId: 1,
      datereservation: new Date().toDateString(),
    };

    this.reservationService.reserver(this.reservation).subscribe((res) => {
      console.log(res);
    });
  }
}
