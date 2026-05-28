import { Injectable }
from '@angular/core';

import { HttpClient }
from '@angular/common/http';

@Injectable({
providedIn:'root'
})

export class RoomService
{
apiUrl=
'https://localhost:7177/api/rooms';

constructor(
private http:HttpClient)
{
}

getRoomsByHotel(
hotelId:number)
{
return this.http.get(
`${this.apiUrl}/hotel/${hotelId}`);
}

addRoom(
data:any)
{
return this.http.post(
this.apiUrl,
data);
}

updateRoom(
id:number,
data:any)
{
return this.http.put(
`${this.apiUrl}/${id}`,
data);
}

deleteRoom(
id:number,
userId:number)
{
return this.http.delete(
`${this.apiUrl}/${id}?userId=${userId}`);
}
}