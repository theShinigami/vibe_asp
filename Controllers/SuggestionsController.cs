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
    [Route("api/suggestions")]
    public class SuggestionsController : ControllerBase
    {
        private readonly ILogger<SuggestionsController> _logger;
        private vibeContext vibedbContext = new vibeContext();

        public SuggestionsController(ILogger<SuggestionsController> logger)
        {
            _logger = logger;
        }


        [HttpGet("get/{id}")]
        public List<SuggestionsData> GetSuggestions(int id) {            
            var result = this.vibedbContext.Follower
                                    .Select(f => f.User)
                                    .Where(f => f != id && f != id)
                                    .Distinct()
                                    .ToList();

            List<SuggestionsData> suggData = new List<SuggestionsData>();

            if (result.Any()) {
                
                for (int i = 0; i < result.Count(); i++) {
                    var userResult = this.vibedbContext.Users
                                                .Where(u => u.Id == result[i])
                                                .ToList();
                    
                    if (userResult.Any()) {

                        suggData.Add(new SuggestionsData {
                            Id = userResult[0].Id,
                            FullName = userResult[0].FullName,
                            Bio = userResult[0].Bio,
                            Picture = this.vibedbContext.ProfilePicture
                                                        .Where(p => p.Id == userResult[0].Picture)
                                                        .ToList()[0].PictureLocation,
                            Status = "Success"
                        });

                    }
                } // for

                return suggData;

            } else {
                suggData.Add(new SuggestionsData { Status = "Failed"});

                return suggData;
            }

        }


        
    }
}
