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
    [Route("api/TopProfile")]
    public class TopProfileController : ControllerBase
    {
        private readonly ILogger<TopProfileController> _logger;
        private vibeContext vibedbContext = new vibeContext();

        public TopProfileController(ILogger<TopProfileController> logger)
        {
            _logger = logger;
        }


        [HttpGet]
        public List<TopProfileData> Get() {            
            var result = this.vibedbContext.Follower
                                    .Select(f => f.Follows)
                                    .Distinct()
                                    .Take(6)
                                    .ToList();
            
            List<TopProfileData> tpd = new List<TopProfileData>();

            // if we found a match
            if (result.Any()) {    
                
                for (int i = 0; i < result.Count(); i++) {

                    var userResult = this.vibedbContext.Users
                                            .Where(u => u.Id == result[i])
                                            .ToList();
                    
                    tpd.Add(new TopProfileData {
                        Id = userResult[0].Id,
                        Picture = this.vibedbContext.ProfilePicture
                                                        .Where(p => p.Id == userResult[0].Picture)
                                                        .ToList()[0].PictureLocation,
                        FullName = userResult[0].FullName,
                        Country = userResult[0].Country,
                        Status = "Success"
                    });

                } // for

                return tpd;


            } else {
                 var limtResult = this.vibedbContext.Users.Take(6).ToList();

                if (limtResult.Any()) {

                    for (int i = 0; i < limtResult.Count(); i++) {

                        tpd.Add(new TopProfileData {
                            Id = limtResult[i].Id,
                            Picture = this.vibedbContext.ProfilePicture
                                                        .Where(p => p.Id == limtResult[i].Picture)
                                                        .ToList()[0].PictureLocation,
                            FullName = limtResult[i].FullName,
                            Country = limtResult[i].Country,
                            Status = "Success"
                        });

                    }

                }

                return tpd;
            }

        }


        
    }
}
