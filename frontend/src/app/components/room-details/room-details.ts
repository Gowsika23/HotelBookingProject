import { Component,Input }
from '@angular/core';

import { FormsModule }
from '@angular/forms';

import { CommonModule }
from '@angular/common';

import { BookingService }
from '../../services/booking';

import { RoomService }
from '../../services/room';

@Component({
selector:'app-room-details',

standalone:true,

imports:[
FormsModule,
CommonModule
],

templateUrl:'./room-details.html',

styleUrl:'./room-details.css'
})

export class RoomDetailsComponent
{
@Input()

hotel:any;

rooms:any=[];

selectedRoom:any=null;

customerName='';

phone='';

personsCount=1;

stayType='Full Day';

checkInDate='';

checkInTime='';

checkOutDate='';

checkOutTime='';

totalPrice=0;

constructor(
private roomService:
RoomService,

private bookingService:
BookingService)
{
}

ngOnInit()
{
this.loadRooms();
}

loadRooms()
{
this.roomService
.getRoomsByHotel(
this.hotel.id)

.subscribe(
(res:any)=>
{
this.rooms=res;
});
}

calculatePrice()
{
if(!this.selectedRoom)
{
alert(
"Select room");

return;
}

const roomPrice=
Number(
this.selectedRoom.price);

if(
this.stayType
===
'Full Day')
{
if(
!this.checkInDate
||
!this.checkOutDate)
{
alert(
"Select dates");

return;
}

const start=
new Date(
this.checkInDate);

const end=
new Date(
this.checkOutDate);

const diff=
end.getTime()
-
start.getTime();

const days=
Math.max(
1,
Math.ceil(
diff/
(1000*60*60*24)));

this.totalPrice=
days*
roomPrice;
}
else
{
if(
!this.checkInDate
||
!this.checkOutDate
||
!this.checkInTime
||
!this.checkOutTime)
{
alert(
"Select date & time");

return;
}

const start=
new Date(
`${this.checkInDate}T${this.checkInTime}:00`);

const end=
new Date(
`${this.checkOutDate}T${this.checkOutTime}:00`);

const diff=
end.getTime()
-
start.getTime();

const hours=
Math.max(
1,
Math.ceil(
diff/
(1000*60*60)));

const hourlyRate=
roomPrice/
24;

this.totalPrice=
Math.round(
hours*
hourlyRate);
}

console.log(
this.totalPrice);
}


confirmBooking()
{
const data=
{
userId:Number(
localStorage
.getItem("userId")),

roomId:
this.selectedRoom.id,

customerName:
this.customerName,

phone:
this.phone,

personsCount:
Number(
this.personsCount),

passengerNames:'',

stayType:
this.stayType,

checkInDate:
this.checkInDate,

checkInTime:
this.checkInTime
+':00',

checkOutDate:
this.checkOutDate,

checkOutTime:
this.checkOutTime
+':00'
};

this.bookingService
.bookRoom(data)

.subscribe(
{
next:(res:any)=>
{
alert(
"Booking Successful");
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