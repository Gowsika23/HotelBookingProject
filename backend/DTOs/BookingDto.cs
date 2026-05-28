namespace HotelBookingApi.DTOs
{
    public class BookingDto
    {
        public int UserId { get; set; }

        public int RoomId { get; set; }

        public string CustomerName { get; set; }

        public string Phone { get; set; }

        public int PersonsCount { get; set; }

        public string PassengerNames { get; set; }

        public string StayType { get; set; }

        public DateTime CheckInDate { get; set; }

        public TimeSpan CheckInTime { get; set; }

        public DateTime CheckOutDate { get; set; }

        public TimeSpan CheckOutTime { get; set; }
    }
}