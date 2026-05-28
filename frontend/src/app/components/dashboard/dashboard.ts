import { Component }
from '@angular/core';

import { CommonModule }
from '@angular/common';

import { HotelsComponent }
from '../hotels/hotels';

import { BookingsComponent }
from '../bookings/bookings';

import { CustomersComponent }
from '../customers/customers';

@Component({
selector:'app-dashboard',

standalone:true,

imports:[
CommonModule,
HotelsComponent,
BookingsComponent,
CustomersComponent
],

templateUrl:'./dashboard.html',

styleUrl:'./dashboard.css'
})

export class DashboardComponent
{
name='';

role='';

showDashboard=true;

showHotels=false;

showBookings=false;

showCustomers=false;

showAccount=false;

ngOnInit()
{
this.name=
localStorage
.getItem(
"name") || '';

this.role=
localStorage
.getItem(
"role") || '';
}

openDashboard()
{
this.showDashboard=true;

this.showHotels=false;

this.showBookings=false;

this.showCustomers=false;
}

openHotels()
{
this.showDashboard=false;

this.showHotels=true;

this.showBookings=false;

this.showCustomers=false;
}

openBookings()
{
this.showDashboard=false;

this.showBookings=true;

this.showHotels=false;

this.showCustomers=false;
}

openCustomers()
{
this.showDashboard=false;

this.showCustomers=true;

this.showHotels=false;

this.showBookings=false;
}

logout()
{
localStorage.clear();

window.location.reload();
}
}