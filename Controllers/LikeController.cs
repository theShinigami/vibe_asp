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
    [Route("api/Like")]
    public class LikeController : ControllerBase
    {
        private readonly ILogger<LikeController> _logger;
        private vibeContext vibedbContext = new vibeContext();

        public LikeController(ILogger<LikeController> logger)
        {
            _logger = logger;
        }


        [HttpPost("{pid}/{uid}")]
        public int Like(int pid, int uid) {

            var result = this.vibedbContext.Plike
                                        .Where(l => l.PostId == pid && l.LikedBy == uid)
                                        .ToList();
            

            if (result.Any()) {
                this.vibedbContext.Remove(result[0]);
                this.vibedbContext.SaveChanges();
                return -1;
            } else {
                var like = new Plike {
                    LikedBy = uid,
                    PostId = pid
                };
                this.vibedbContext.Add(like);
                this.vibedbContext.SaveChanges();
                return 1;
            }

        }



        
    }
}
