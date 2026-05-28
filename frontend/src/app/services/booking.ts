import { Injectable }
from '@angular/core';

import { HttpClient }
from '@angular/common/http';

@Injectable({
providedIn:'root'
})

export class BookingService
{
apiUrl=
'https://localhost:7177/api/bookings';

constructor(
private http:HttpClient)
{
}

bookRoom(
data:any)
{
return this.http.post(
this.apiUrl,
data);
}

getBookings(
userId:number)
{
return this.http.get(
`${this.apiUrl}/user/${userId}`);
}

getCustomersByHotel(
hotelId:number)
{
return this.http.get(
`${this.apiUrl}/hotel/${hotelId}`);
}

cancelBooking(
bookingId:number)
{
const userId=
localStorage
.getItem(
"userId");

return this.http.delete(
`${this.apiUrl}/${bookingId}?userId=${userId}`);
}
}