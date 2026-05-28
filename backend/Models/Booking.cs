namespace HotelBookingApi.Models
{
    public class Booking
    {
        public int Id { get; set; }

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

        public DateTime BookingDate { get; set; }

        public string Status { get; set; }
    }
}