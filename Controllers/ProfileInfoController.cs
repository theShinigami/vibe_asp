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
    [Route("api/ProfileInfo")]
    public class ProfileInfoController : ControllerBase
    {
        private readonly ILogger<ProfileInfoController> _logger;
        private vibeContext vibedbContext = new vibeContext();

        public ProfileInfoController(ILogger<ProfileInfoController> logger)
        {
            _logger = logger;
        }


        [HttpGet("get/{id}")]
        public UserData Get(int id) {            
            var result = this.vibedbContext.Users
                                    .Where(p => p.Id == id);
            
            // if we found a match
            if (result.Any()) {
                var listData = result.ToList()[0];

                return new UserData {
                    Id = id,
                    Fullname = listData.FullName,
                    Username = listData.Username,
                    Country = listData.Country,
                    Email = listData.Email,
                    Phone = listData.Phone,
                    Bio = listData.Bio,
                    Status = "Success"
                };
            } else { // if we didn't
                return new UserData {
                    Status = "Failed"
                };
            }

        }


        
    }
}
