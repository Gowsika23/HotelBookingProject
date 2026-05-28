using HotelBookingApi.Data;
using HotelBookingApi.DTOs;
using HotelBookingApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace HotelBookingApi.Controllers
{
    [ApiController]
    [Route("api/bookings")]
    public class BookingsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BookingsController(
            AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]

        public IActionResult BookRoom(
            BookingDto dto)
        {
            var room =
            _context.Rooms
            .FirstOrDefault(
            x => x.Id ==
            dto.RoomId);

            if (room == null)
            {
                return NotFound(
                "Room not found");
            }

            if (
            room.AvailabilityCount <= 0)
            {
                return BadRequest(
                "No rooms available");
            }

            Booking booking =
            new Booking
            {
                UserId =
                dto.UserId,

                RoomId =
                dto.RoomId,

                CustomerName =
                dto.CustomerName,

                Phone =
                dto.Phone,

                PersonsCount =
                dto.PersonsCount,

                PassengerNames =
                dto.PassengerNames,

                StayType =
                dto.StayType,

                CheckInDate =
                dto.CheckInDate,

                CheckInTime =
                dto.CheckInTime,

                CheckOutDate =
                dto.CheckOutDate,

                CheckOutTime =
                dto.CheckOutTime,

                BookingDate =
                DateTime.Now,

                Status =
                "Booked"
            };

            _context.Bookings
            .Add(booking);

            room.AvailabilityCount--;

            _context.SaveChanges();

            return Ok(
            "Booking Successful");
        }

        [HttpGet("user/{userId}")]

        public IActionResult GetHistory(
            int userId)
        {
            var bookings =

            _context.Bookings

            .Where(
            x => x.UserId ==
            userId)

            .Join(
            _context.Rooms,

            booking =>
            booking.RoomId,

            room =>
            room.Id,

            (booking, room) =>
            new
            {
                booking.Id,

                booking.CustomerName,

                booking.Phone,

                booking.PersonsCount,

                booking.PassengerNames,

                booking.StayType,

                booking.CheckInDate,

                booking.CheckInTime,

                booking.CheckOutDate,

                booking.CheckOutTime,

                booking.Status,

                RoomType =
                room.RoomType,

                Price =
                room.Price,

                HotelId =
                room.HotelId
            })

            .Join(
            _context.Hotels,

            x => x.HotelId,

            hotel => hotel.Id,

            (x, hotel) =>
            new
            {
                x.Id,

                HotelName =
                hotel.HotelName,

                x.RoomType,

                x.Price,

                x.CustomerName,

                x.Phone,

                x.PersonsCount,

                x.PassengerNames,

                x.StayType,

                x.CheckInDate,

                x.CheckInTime,

                x.CheckOutDate,

                x.CheckOutTime,

                x.Status
            })

            .ToList();

            return Ok(
            bookings);
        }

        [HttpGet("hotel/{hotelId}")]

        public IActionResult
GetCustomersByHotel(
int hotelId)
        {
            var customers =

            _context.Bookings

            .Join(
            _context.Rooms,

            booking =>
            booking.RoomId,

            room =>
            room.Id,

            (booking, room) =>
            new
            {
                booking.CustomerName,

                booking.Phone,

                booking.PersonsCount,

                booking.StayType,

                booking.CheckInDate,

                booking.CheckInTime,

                booking.CheckOutDate,

                booking.CheckOutTime,

                booking.Status,

                RoomType =
                room.RoomType,

                Price =
                room.Price,

                HotelId =
                room.HotelId
            })

            .Where(
            x =>
            x.HotelId
            ==
            hotelId)

            .Join(
            _context.Hotels,

            x =>
            x.HotelId,

            hotel =>
            hotel.Id,

            (x, hotel) =>
            new
            {
                x.CustomerName,

                x.Phone,

                HotelName =
                hotel.HotelName,

                x.RoomType,

                x.PersonsCount,

                x.StayType,

                x.CheckInDate,

                x.CheckInTime,

                x.CheckOutDate,

                x.CheckOutTime,

                x.Price,

                x.Status
            })

            .ToList();

            return Ok(
            customers);
        }

        [HttpDelete("{id}")]

        public IActionResult CancelBooking(
            int id,

            [FromQuery]
            int userId)
        {
            var booking =
            _context.Bookings
            .FirstOrDefault(
            x => x.Id ==
            id);

            if (booking == null)
            {
                return NotFound(
                "Booking not found");
            }

            if (
            booking.UserId
            != userId)
            {
                return Unauthorized(
                "Cannot cancel");
            }

            if (
            booking.Status
            == "Cancelled")
            {
                return BadRequest(
                "Already cancelled");
            }

            var room =
            _context.Rooms
            .FirstOrDefault(
            x => x.Id ==
            booking.RoomId);

            if (room != null)
            {
                room.AvailabilityCount++;
            }

            booking.Status =
            "Cancelled";

            _context.SaveChanges();

            return Ok(
            "Booking cancelled");
        }
    }
}