using HotelBookingApi.Data;
using HotelBookingApi.DTOs;
using HotelBookingApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace HotelBookingApi.Controllers
{
    [ApiController]

    [Route("api/auth")]

    public class AuthController
    : ControllerBase
    {
        private readonly AppDbContext
        _context;

        public AuthController(
        AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("signup")]

        public IActionResult
        Signup(SignupDto dto)
        {

            if (
            string.IsNullOrWhiteSpace(
            dto.Name)

            ||

            string.IsNullOrWhiteSpace(
            dto.Email)

            ||

            string.IsNullOrWhiteSpace(
            dto.Password))
            {
                return BadRequest(
                "All fields required");
            }

            if (
            _context.Users.Any(
            x => x.Email
            ==
            dto.Email))
            {
                return BadRequest(
                "Email already exists");
            }

            User user =
            new User
            {
                Name = dto.Name,

                Email = dto.Email,

                Password = dto.Password,

                Role = "Customer"
            };

            _context.Users.Add(
            user);

            _context.SaveChanges();

            return Ok(new
            {
                user.Id,

                user.Name,

                user.Role
            });
        }


        [HttpPost("login")]

        public IActionResult Login(
LoginDto dto)
        {

            var user =

            _context.Users
            .FirstOrDefault(
            x =>

            x.Email.Trim()
            .ToLower()

            ==

            dto.Email.Trim()
            .ToLower());



            if (user == null)
            {
                return BadRequest(
                "User not found. Please signup.");
            }



            if (
            user.Password
            !=
            dto.Password)
            {
                return BadRequest(
                "Invalid password");
            }



            return Ok(new
            {
                user.Id,

                user.Name,

                user.Role
            });

        }
    }
    
    }
