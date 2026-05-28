import { Component }
from '@angular/core';

import { FormsModule }
from '@angular/forms';

import { CommonModule }
from '@angular/common';

import { HotelService }
from '../../services/hotel';

import { RoomService }
from '../../services/room';

import { RoomDetailsComponent }
from '../room-details/room-details';

@Component({
selector:'app-hotels',

standalone:true,

imports:[
FormsModule,
CommonModule,
RoomDetailsComponent
],

templateUrl:'./hotels.html',

styleUrl:'./hotels.css'
})

export class HotelsComponent
{
hotels:any=[];

rooms:any=[];

location='';

role='';

showAddForm=false;

showRoomPopup=false;

showRoomPage=false;

selectedHotel:any=null;

hotelName='';

hotelLocation='';

price=0;

description='';

roomType='';

roomPrice=0;

availabilityCount=0;

editingRoomId=0;

constructor(
private hotelService:
HotelService,

private roomService:
RoomService)
{
}

ngOnInit()
{
this.role=
localStorage
.getItem(
"role")
|| '';

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

searchHotels()
{
this.hotelService
.searchHotels(
this.location)

.subscribe(
(res:any)=>
{
this.hotels=res;
});
}

bookRoom(
hotel:any)
{
this.selectedHotel=
hotel;

this.showRoomPage=
true;
}

manageRooms(
hotel:any)
{
this.selectedHotel=
hotel;

this.showRoomPopup=
true;

this.loadRooms(
hotel.id);
}

loadRooms(
hotelId:number)
{
this.roomService
.getRoomsByHotel(
hotelId)

.subscribe(
(res:any)=>
{
this.rooms=res;
});
}

addRoom()
{
const data=
{
userId:Number(
localStorage
.getItem(
"userId")),

hotelId:
this.selectedHotel.id,

roomType:
this.roomType,

price:
this.roomPrice,

availabilityCount:
this.availabilityCount
};

this.roomService
.addRoom(
data)

.subscribe(
{
next:(res:any)=>
{
alert(
"Room Added");

this.roomType='';

this.roomPrice=0;

this.availabilityCount=0;

this.loadRooms(
this.selectedHotel.id);
},

error:(err:any)=>
{
alert(
JSON.stringify(
err.error));
}
});
}

updateRoom(
room:any)
{
const data=
{
userId:Number(
localStorage
.getItem(
"userId")),

hotelId:
room.hotelId,

roomType:
room.roomType,

price:
room.price,

availabilityCount:
room.availabilityCount
};

this.roomService
.updateRoom(
room.id,
data)

.subscribe(
{
next:(res:any)=>
{
alert(
"Room Updated");

this.loadRooms(
this.selectedHotel.id);
},

error:(err:any)=>
{
alert(
JSON.stringify(
err.error));
}
});
}

deleteRoom(
id:number)
{
this.roomService
.deleteRoom(
id,

Number(
localStorage
.getItem(
"userId")))

.subscribe(
{
next:(res:any)=>
{
alert(
"Room Deleted");

this.loadRooms(
this.selectedHotel.id);
},

error:(err:any)=>
{
alert(
JSON.stringify(
err.error));
}
});
}


addHotel()
{
const data=
{
userId:Number(
localStorage
.getItem(
"userId")),

hotelName:
this.hotelName,

location:
this.hotelLocation,

price:
this.price,

description:
this.description
};

this.hotelService
.addHotel(
data)

.subscribe(
{
next:(res:any)=>
{
alert(
"Hotel Added");

this.showAddForm=
false;

this.hotelName='';

this.hotelLocation='';

this.price=0;

this.description='';

this.loadHotels();
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

updateHotel(
hotel:any)
{
const name=
prompt(
"Hotel Name",
hotel.hotelName);

if(!name)
{
return;
}

const location=
prompt(
"Location",
hotel.location);

const price=
prompt(
"Price",
hotel.price);

const description=
prompt(
"Description",
hotel.description);

const data=
{
userId:Number(
localStorage
.getItem(
"userId")),

hotelName:
name,

location:
location,

price:Number(
price),

description:
description
};

this.hotelService
.updateHotel(
hotel.id,
data)

.subscribe(
{
next:(res:any)=>
{
alert(
"Hotel Updated");

this.loadHotels();
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

deleteHotel(
id:number)
{
if(
!confirm(
"Delete Hotel?"))
{
return;
}

this.hotelService
.deleteHotel(id)

.subscribe(
{
next:(res:any)=>
{
alert(
"Hotel Deleted");

this.hotels=
this.hotels.filter(
(h:any)=>
h.id!==id);
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