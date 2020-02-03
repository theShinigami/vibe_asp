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
            var result = this.vibedbContext.Users
                                    .Select(u => u.Id)
                                    .Where(u => u != id)
                                    .ToList();

            List<SuggestionsData> suggData = new List<SuggestionsData>();

            
            if (result.Any()) {

                for (int i = 0; i < result.Count(); i++) {

                    // check follower
                    var followerResult = this.vibedbContext.Follower
                                                        .Where(f => f.User == id && f.Follows == result[i])
                                                        .ToList();
                    

                    if (!followerResult.Any()) {
                        
                        var user = this.vibedbContext.Users
                                                    .Where(u => u.Id == result[i])
                                                    .ToList();
                        

                        suggData.Add(new SuggestionsData {
                            Id = user[0].Id,
                            FullName = user[0].FullName,
                            Bio = user[0].Bio,
                            Picture = this.vibedbContext.ProfilePicture
                                                        .Where(p => p.Id == user[0].Picture)
                                                        .ToList()[0].PictureLocation,
                            Status = "Success"
                        });

                    } else {
                        // pass
                    }


                }

                return suggData;

            } else {
                suggData.Add(new SuggestionsData {
                    Status = "Failed"
                });

                return suggData;
            }

        }


        
    }
}
