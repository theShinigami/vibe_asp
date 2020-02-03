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
    [Route("api/passwd")]
    public class PasswordController : ControllerBase
    {
        private readonly ILogger<PasswordController> _logger;
        private vibeContext vibedbContext = new vibeContext();

        public PasswordController(ILogger<PasswordController> logger)
        {
            _logger = logger;
        }


        [HttpPost("change/{id}/{old}/{newp}")]
        public int Change(int id, string old, string newp) {
            var usersResult = this.vibedbContext.Users
                                    .First(p => p.Id == id);

            
            if (usersResult != null) {
                if (usersResult.Password == old) {
                    _logger.LogInformation("Old password matched: " + old);
                    
                    usersResult.Password = newp;

                    try {
                        this.vibedbContext.Update(usersResult);
                        this.vibedbContext.SaveChanges();
    
                        _logger.LogInformation("Done updating!");

                    } catch(Exception e) {
                        _logger.LogError("Error while updating: " + e);
                    }

                    return 1;
                } else {
                    _logger.LogWarning("Old password don't match: " + old);
                    return 0;
                }
            } else {
                return 0;
            }
        }


        
    }
}
