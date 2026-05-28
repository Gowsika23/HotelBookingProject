namespace HotelBookingApi.DTOs
{
    public class RoomDto
    {
        public int UserId { get; set; }

        public int HotelId { get; set; }

        public string RoomType { get; set; }

        public decimal Price { get; set; }

        public int AvailabilityCount { get; set; }
    }
}