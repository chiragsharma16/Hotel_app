import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../reservation/reservation.service';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeComponent } from "../home/home.component";

@Component({
  selector: 'app-reservation-form',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HomeComponent],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css',
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private formbuider: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reservationForm = this.formbuider.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],
    });

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
     this.reservationService.getReservation(id).subscribe(res => {
      if (res) {
        this.reservationForm.patchValue(res);
      }
     });
      
    }
  }
  onSubmit() {
    if (this.reservationForm.valid) {
      let reservation: Reservation = this.reservationForm.value;

      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id) {
        //update
        this.reservationService.updateReservation(id, reservation).subscribe(() =>{
          console.log("Reservation got updated");
        });
      } else {
        //new
        this.reservationService.addReservation(reservation).subscribe(()=>{
          console.log("New Reservation created");
        });
      }
      this.router.navigate(['/list']);
    }
  }
}
