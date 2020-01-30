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
    [Route("api/Signin")]
    public class SigninController : ControllerBase
    {
        private readonly ILogger<SigninController> _logger;
        private vibeContext vibedbContext = new vibeContext();

        public SigninController(ILogger<SigninController> logger)
        {
            _logger = logger;
        }


        [HttpPost]
        [Produces("application/json")]
        public UserData Post() {

            var collection = Request.Form;
            var username = collection["username"];
            var passwd = collection["password"];

            // query
            var result = this.vibedbContext.Users
                                    .Where(u => u.Username == username.ToString() && u.Password == passwd.ToString());

            // log
            _logger.LogInformation("Username: " + username + " Password: " + passwd);

            if (result.Any()) {
                var listData = result.ToList()[0];


                return new UserData {
                    Id = listData.Id,
                    Fullname = listData.FullName,
                    Username = listData.Username,
                    Bio = (!String.IsNullOrEmpty(listData.Bio)) ? listData.Bio : "null",
                    Picture = (int)listData.Picture,
                    Email = listData.Email,
                    Country = listData.Country,
                    Phone = listData.Phone,
                    Status = "Success"
                };
            } else {
                return new UserData {
                    Status = "Failed"
                };
            }
        }


        

        
    }
}
