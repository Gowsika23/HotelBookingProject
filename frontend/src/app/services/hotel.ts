import { Injectable }
from '@angular/core';

import { HttpClient }
from '@angular/common/http';

@Injectable({
  providedIn:'root'
})

export class HotelService
{
  apiUrl=
  'https://localhost:7177/api/hotels';

  constructor(
    private http:HttpClient)
  {
  }

  getHotels()
  {
    return this.http.get(
      this.apiUrl);
  }

  searchHotels(
    location:string)
  {
    return this.http.get(
`${this.apiUrl}/search?location=${location}`);
  }

  addHotel(
    data:any)
  {
    return this.http.post(
      this.apiUrl,
      data);
  }

  deleteHotel(
  id:number)
{
    const userId=
      localStorage
      .getItem("userId");

    return this.http.delete(
`${this.apiUrl}/${id}?userId=${userId}`);
}

updateHotel(
  id:number,

  data:any)
{
    return this.http.put(
`${this.apiUrl}/${id}`,
    data);
}

}