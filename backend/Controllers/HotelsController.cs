using HotelBookingApi.Data;
using HotelBookingApi.DTOs;
using HotelBookingApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace HotelBookingApi.Controllers
{
    [ApiController]
    [Route("api/hotels")]
    public class HotelsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public HotelsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllHotels()
        {
            var hotels = _context.Hotels.ToList();

            return Ok(hotels);
        }

        [HttpGet("{id}")]
        public IActionResult GetHotelById(int id)
        {
            var hotel =
                _context.Hotels
                .FirstOrDefault(x => x.Id == id);

            if (hotel == null)
            {
                return NotFound(
                    "Hotel not found");
            }

            return Ok(hotel);
        }

        [HttpPost]
        public IActionResult AddHotel(HotelDto dto)
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
                    "Only Admin can add hotels");
            }

            Hotel hotel = new Hotel
            {
                HotelName = dto.HotelName,
                Location = dto.Location,
                Price = dto.Price,
                Description = dto.Description
            };

            _context.Hotels.Add(hotel);

            _context.SaveChanges();

            return Ok(
                "Hotel added successfully");
        }

      /*  [HttpPut("{id}")]
        public IActionResult UpdateHotel(
            int id,
            HotelDto dto)
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
                    "Only Admin can update");
            }

            var hotel =
                _context.Hotels
                .FirstOrDefault(
                x => x.Id == id);

            if (hotel == null)
            {
                return NotFound(
                    "Hotel not found");
            }

            hotel.HotelName =
                dto.HotelName;

            hotel.Location =
                dto.Location;

            hotel.Price =
                dto.Price;

            hotel.Description =
                dto.Description;

            _context.SaveChanges();

            return Ok(
                "Hotel updated");
        }
      */

        [HttpDelete("{id}")]
        public IActionResult DeleteHotel(
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
                    "Only Admin can delete");
            }

            var hotel =
                _context.Hotels
                .FirstOrDefault(
                x => x.Id == id);

            if (hotel == null)
            {
                return NotFound(
                    "Hotel not found");
            }

            _context.Hotels.Remove(hotel);

            _context.SaveChanges();

            return Ok(
                "Hotel deleted");
        }

        [HttpGet("search")]
        public IActionResult SearchHotels(
    string location)
        {
            var hotels =
                (from h in _context.Hotels
                 join r in _context.Rooms
                 on h.Id equals r.HotelId

                 where h.Location
                 .Contains(location)

                 &&
                 r.AvailabilityCount > 0

                 select h)

                 .Distinct()
                 .ToList();

            return Ok(hotels);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateHotel(
     int id,
     HotelDto dto)
        {
            var hotel =
                _context.Hotels
                .FirstOrDefault(
                x => x.Id == id);

            if (hotel == null)
            {
                return NotFound(
                    "Hotel not found");
            }

            hotel.HotelName = dto.HotelName;
            hotel.Location = dto.Location;
            hotel.Price = dto.Price;
            hotel.Description = dto.Description;

            _context.SaveChanges();

            return Ok(
                "Hotel Updated");
        }

    }
}