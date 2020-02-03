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
    [Route("api/fnf")]
    public class FollowerAndFollowingController : ControllerBase
    {
        private readonly ILogger<FollowerAndFollowingController> _logger;
        private vibeContext vibedbContext = new vibeContext();

        public FollowerAndFollowingController(ILogger<FollowerAndFollowingController> logger)
        {
            _logger = logger;
        }


        [HttpGet("get/{id}")]
        public FnFData Get(int id) {            
            var flwing = this.vibedbContext.Follower
                                    .Where(f => f.User == id);
            
            var flwers = this.vibedbContext.Follower
                                    .Where(f => f.Follows == id);

            _logger.LogInformation("The Follower List: " + flwing.Count());
            // if we found a match
            if (flwing.Any() || flwers.Any()) {
                return new FnFData {
                    Id = id,
                    Following = flwing.Count(),
                    Followers = flwers.Count()
                };
            } else { // if we didn't
                return new FnFData {
                    Id = id,
                    Following = 0,
                    Followers = 0
                };
            }

        }

        [HttpPost("follow/{id}/{follow}")]
        public int Follow(int id, int follow) {

            var userID = this.vibedbContext.Users
                                        .Where(s => s.Id == id)
                                        .ToList();
            var userFollow = this.vibedbContext.Users
                                        .Where(s => s.Id == follow)
                                        .ToList();

            
            // check both before proceding
            if (userID.Any() && userFollow.Any()) {

                var followerModel = new Follower {
                    User = id,
                    Follows = follow
                };

                this.vibedbContext.Add(followerModel);
                var result = this.vibedbContext.SaveChanges();

                if (result == 1) {
                    return 1;
                } else {
                    return 0;
                }




            } else {
                return 0;
            }
            

        }


        
    }
}
