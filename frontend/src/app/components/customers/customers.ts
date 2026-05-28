import { Component }
from '@angular/core';

import { CommonModule }
from '@angular/common';

import { FormsModule }
from '@angular/forms';

import { HotelService }
from '../../services/hotel';

import { BookingService }
from '../../services/booking';

@Component({
selector:'app-customers',

standalone:true,

imports:[
CommonModule,
FormsModule
],

templateUrl:'./customers.html',

styleUrl:'./customers.css'
})

export class CustomersComponent
{
hotels:any=[];

customers:any=[];

selectedHotelId=0;

constructor(
private hotelService:
HotelService,

private bookingService:
BookingService)
{
}

ngOnInit()
{
this.loadHotels();
}

loadHotels()
{
this.hotelService
.getHotels()

.subscribe(
(res:any)=>
{
this.hotels=res;
});
}

loadCustomers()
{
if(
!this.selectedHotelId)
{
return;
}

this.bookingService
.getCustomersByHotel(
this.selectedHotelId)

.subscribe(
(res:any)=>
{
this.customers=res;
});
}
}