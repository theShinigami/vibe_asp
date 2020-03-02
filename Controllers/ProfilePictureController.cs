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
    [Route("api/ProfilePicture")]
    public class ProfilePictureController : ControllerBase
    {
        private readonly ILogger<ProfilePictureController> _logger;
        private vibeContext vibedbContext = new vibeContext();

        public ProfilePictureController(ILogger<ProfilePictureController> logger)
        {
            _logger = logger;
        }




        [HttpGet("get/{id}")]
        public PictureData Get(int id) {
            var result = this.vibedbContext.ProfilePicture
                                    .Where(pp => pp.Id == id);
            
            if (result.Any()) {
                var listData = result.ToList()[0];

                return new PictureData {
                    Id = listData.Id,
                    PictureLocation = listData.PictureLocation,
                    Hash = listData.Hash,
                    UserId = (int)listData.UserId,
                    CreatedAt = listData.CreatedAt,
                    Status = "Success"
                };
            } else {
                return new PictureData {
                    Status = "Failed"
                };
            }
        }

        [HttpGet("getImage/{id}")]
        public ImageData GetImage(int id) {
            var result = this.vibedbContext.Image
                                    .Where(i => i.Id == id);
            

            if (result.Any()) {
                var listData = result.ToList()[0];

                return new ImageData {
                    Id = listData.Id,
                    PicLocation = listData.PicLocation,
                    Hash = listData.Hash,
                    UploadedBy = listData.UploadedBy,
                    Status = "Success"
                };
            } else {
                return new ImageData {
                    Status = "Failed"
                };
            }
        }


        
    }
}
