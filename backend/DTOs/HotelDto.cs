namespace HotelBookingApi.DTOs
{
    public class HotelDto
    {
        public int UserId { get; set; }

        public string HotelName { get; set; }

        public string Location { get; set; }

        public decimal Price { get; set; }

        public string Description { get; set; }
    }
}