import { Component }
from '@angular/core';

import { CommonModule }
from '@angular/common';

import { BookingService }
from '../../services/booking';

@Component({
  selector:'app-bookings',

  standalone:true,

  imports:[
    CommonModule
  ],

  templateUrl:'./bookings.html',

  styleUrl:'./bookings.css'
})

export class BookingsComponent
{
  bookings:any=[];

  constructor(
    private bookingService:
    BookingService)
  {
  }

  ngOnInit()
  {
    this.loadBookings();
  }

  loadBookings()
  {
      const userId=
      Number(
      localStorage
      .getItem("userId"));

      this.bookingService
        .getBookings(
        userId)
        .subscribe(
        (res:any)=>
        {
          console.log(res);

          this.bookings=res;
        });
  }

  cancelBooking(
    id:number)
  {
      this.bookingService
        .cancelBooking(id)
        .subscribe(
        {
          next:(res:any)=>
          {
            alert(
            "Booking Cancelled");

            this.loadBookings();
          },

          error:(err:any)=>
          {
            console.log(err);

            alert(
            JSON.stringify(
            err.error));
          }
        });
  }
}