using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Vibe.Models;

namespace Vibe.Controllers
{
    [ApiController]
    [Route("api/Signup")]
    public class SignupController : ControllerBase
    {
        private readonly ILogger<SignupController> _logger;
        private vibeContext vibedbContext = new vibeContext();

        public SignupController(ILogger<SignupController> logger)
        {
            _logger = logger;
        }


        [HttpPost]
        public int Post() {
            var collection = Request.Form;
            
            var Fullname = collection["fullname"];
            var Username = collection["username"];
            var Country = collection["country"];
            var Email = collection["Email"];
            var Phone = collection["Phone"];
            var Password = collection["password"];

            var user = new Users {
                FullName = Fullname,
                Username = Username,
                Country = Country,
                Email = Email,
                Phone = Phone,
                Password = Password,
                Picture = 0,
                Bio = "",
                CreatedAt = DateTime.Now
            };
            this.vibedbContext.Add(user);
            var result = this.vibedbContext.SaveChanges();

            if (result == 1) {
                return 1;
            } else {
                return 0;
            }
            
        }


        [HttpGet("checkUsername/{user}")]
        public bool checkUsername(string user) {
            var result = this.vibedbContext.Users
                    .Where(u => u.Username == user);

            return result.Any();
        }

        
        [HttpGet("checkEmail/{email}")]
        public bool checkEmail(string email) {
            var result = this.vibedbContext.Users
                    .Where(e => e.Email == email);

            return result.Any();
        }


        [HttpGet("checkPhone/{phone}")]
        public bool checkPhone(string phone) {
            var result = this.vibedbContext.Users
                    .Where(p => p.Phone == phone);

            return result.Any();
        }


        [HttpGet("{id}")]
        public string getTest(int id) {
            return "This is the value: " + id;
        }

        [HttpPost("register/{id:int}")]
        public string testPost(int id) {
            _logger.LogInformation("[testPost] = id:" + id);
            return "ID: " + id;
        }


        [HttpGet]
        [Route("test")]
        public IActionResult test() {
            _logger.LogInformation("Testing...");
            return Ok(new { data = "It Worked!"});
        }

        
    }
}
