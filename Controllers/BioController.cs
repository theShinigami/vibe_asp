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
    [Route("api/Bio")]
    public class BioController : ControllerBase
    {
        private readonly ILogger<BioController> _logger;
        private vibeContext vibedbContext = new vibeContext();

        public BioController(ILogger<BioController> logger)
        {
            _logger = logger;
        }


        [HttpGet("get/{id}")]
        public BioData GetBio(int id) {            
            var result = this.vibedbContext.Users
                                    .Where(b => b.Id == id);
            
            // if we found a match
            if (result.Any()) {
                var listData = result.ToList()[0];

                return new BioData {
                    Id = id,
                    Bio = listData.Bio,
                    Status = "Success"
                };
            } else { // if we didn't
                return new BioData {
                    Status = "Failed"
                };
            }

        }


        
    }
}
