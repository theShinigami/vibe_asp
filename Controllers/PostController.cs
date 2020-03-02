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


        [HttpPost]
        public int Post() {
            var collection = Request.Form;
            
            var post = new Post {
                Uid = int.Parse(collection["uid"]),
                Caption = collection["description"],
                Title = collection["title"]
            };

            this.vibedbContext.Add(post);
            var postResult = this.vibedbContext.SaveChanges();


            if (postResult == 1) {
                return 1;
            } else {
                return 0;
            }


            
        }


        [HttpGet("getTop")]
        public List<PostData> getTop() {

            var result = this.vibedbContext.Post
                                            .Take(15)
                                            .ToList();
            
            List<PostData> postData = new List<PostData>();

            if (result.Any()) {
                _logger.LogInformation("Post Count: " + result.Count());
            

                foreach (var post in result) {
                    postData.Add(new PostData {
                        Id = post.Id,
                        Fullname = this.vibedbContext.Users.Where(u => u.Id == post.Uid).ToList()[0].FullName,
                        CreatedAt = post.CreatedAt,
                        PosterPicture = (this.vibedbContext.ProfilePicture.Where(pp => pp.UserId == post.Uid).ToList().Any()) ? this.vibedbContext.ProfilePicture.Where(pp => pp.UserId == post.Uid).ToList()[0].PictureLocation : "/Pictures/Profile/default-user-profile.jpg",
                        Title = post.Title,
                        Country = this.vibedbContext.Users.Where(u => u.Id == post.Uid).ToList()[0].Country,
                        Payment = (int)this.vibedbContext.Users.Where(u => u.Id == post.Uid).ToList()[0].Payment,
                        Like = this.vibedbContext.Plike.Where(pl => pl.PostId == post.Id).ToList().Count(),
                        ImgId = (post.ImgId == null) ? -1 : (int)post.ImgId,
                        Caption = post.Caption,
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
