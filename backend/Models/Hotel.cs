namespace HotelBookingApi.Models
{
    public class Hotel
    {
        public int Id { get; set; }

        public string HotelName { get; set; }

        public string Location { get; set; }

        public decimal Price { get; set; }

        public string Description { get; set; }
    }
}