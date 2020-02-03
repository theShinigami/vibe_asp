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
    [Route("api/Post")]
    public class PostController : ControllerBase
    {
        private readonly ILogger<PostController> _logger;
        private vibeContext vibedbContext = new vibeContext();

        public PostController(ILogger<PostController> logger)
        {
            _logger = logger;
        }


        [HttpGet("getTop")]
        public List<PostData> getTop() {

            var result = this.vibedbContext.Post
                                            .Take(6)
                                            .ToList();
            
            List<PostData> postData = new List<PostData>();

            if (result.Any()) {
                
                for (int i = 0; i < result.Count(); i++) {

                    postData.Add(new PostData {
                        Id = result[i].Id,
                        Fullname = this.vibedbContext.Users.Where(u => u.Id == result[i].Uid).ToList()[0].FullName,
                        CreatedAt = result[i].CreatedAt,
                        PosterPicture = this.vibedbContext.ProfilePicture.Where(pp => pp.Id == result[i].Uid).ToList()[0].PictureLocation,
                        Country = this.vibedbContext.Users.Where(u => u.Id == result[i].Uid).ToList()[0].Country,
                        Payment = (int)this.vibedbContext.Users.Where(u => u.Id == result[i].Uid).ToList()[0].Payment,
                        Like = this.vibedbContext.Plike.Where(pl => pl.PostId == result[i].Id).ToList().Count(),
                        ImgId = (result[i].ImgId == null) ? -1 : (int)result[i].ImgId,
                        Caption = result[i].Caption,
                        Status = "Success"
                    });

                }

            } else {
                postData.Add(new PostData {
                    Status = "Failed"
                });
            }

            return postData;


        }


        
    }
}
