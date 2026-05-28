using HotelBookingApi.Data;
using HotelBookingApi.DTOs;
using HotelBookingApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace HotelBookingApi.Controllers
{
    [ApiController]
    [Route("api/rooms")]
    public class RoomsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RoomsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllRooms()
        {
            var rooms =
                _context.Rooms.ToList();

            return Ok(rooms);
        }

        [HttpGet("{id}")]
        public IActionResult GetRoomById(int id)
        {
            var room =
                _context.Rooms
                .FirstOrDefault(
                x => x.Id == id);

            if (room == null)
            {
                return NotFound(
                    "Room not found");
            }

            return Ok(room);
        }

        [HttpPost]
        public IActionResult AddRoom(RoomDto dto)
        {
            var user =
                _context.Users
                .FirstOrDefault(
                x => x.Id == dto.UserId);

            if (user == null)
            {
                return NotFound(
                    "User not found");
            }

            if (user.Role != "Admin")
            {
                return Unauthorized(
                    "Only admin can add rooms");
            }

            var hotel =
                _context.Hotels
                .FirstOrDefault(
                x => x.Id == dto.HotelId);

            if (hotel == null)
            {
                return NotFound(
                    "Hotel not found");
            }

            Room room = new Room
            {
                HotelId = dto.HotelId,
                RoomType = dto.RoomType,
                Price = dto.Price,
                AvailabilityCount =
                    dto.AvailabilityCount
            };

            _context.Rooms.Add(room);

            _context.SaveChanges();

            return Ok(
                "Room added successfully");
        }

        [HttpPut("{id}")]
        public IActionResult UpdateRoom(
            int id,
            RoomDto dto)
        {
            var user =
                _context.Users
                .FirstOrDefault(
                x => x.Id == dto.UserId);

            if (user == null)
            {
                return NotFound(
                    "User not found");
            }

            if (user.Role != "Admin")
            {
                return Unauthorized(
                    "Only admin can update");
            }

            var room =
                _context.Rooms
                .FirstOrDefault(
                x => x.Id == id);

            if (room == null)
            {
                return NotFound(
                    "Room not found");
            }

            room.RoomType =
                dto.RoomType;

            room.Price =
                dto.Price;

            room.AvailabilityCount =
                dto.AvailabilityCount;

            _context.SaveChanges();

            return Ok(
                "Room updated");
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteRoom(
            int id,
            [FromQuery] int userId)
        {
            var user =
                _context.Users
                .FirstOrDefault(
                x => x.Id == userId);

            if (user == null)
            {
                return NotFound(
                    "User not found");
            }

            if (user.Role != "Admin")
            {
                return Unauthorized(
                    "Only admin can delete");
            }

            var room =
                _context.Rooms
                .FirstOrDefault(
                x => x.Id == id);

            if (room == null)
            {
                return NotFound(
                    "Room not found");
            }

            _context.Rooms.Remove(room);

            _context.SaveChanges();

            return Ok(
                "Room deleted");
        }

        [HttpGet("hotel/{hotelId}")]

        public IActionResult GetRoomsByHotel(
    int hotelId)
        {
            var rooms =
                _context.Rooms
                .Where(
                x => x.HotelId
                == hotelId)
                .ToList();

            return Ok(
                rooms);
        }
    }
}