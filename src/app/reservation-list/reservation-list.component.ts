import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservation/reservation.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-reservation-list',
  imports: [CommonModule, RouterModule, HomeComponent],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent implements OnInit{
 
 reservations: Reservation[] = [];

 constructor(private reservationservice: ReservationService){}
  ngOnInit(): void {
     this.reservationservice.getReservations().subscribe(res => {
      this.reservations = res ;
     });
  }
  
  deleteReservation(id: string){
    this.reservationservice.deleteReservation(id).subscribe(() => {
          console.log("Deleted the Reservation");
    });
  }

}
