using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Vibe.Models;

namespace Vibe.Controllers
{
    [ApiController]
    [Route("api/ProfilePictureUpload")]
    public class ProfilePictureUploadController : ControllerBase
    {
        private readonly ILogger<ProfilePictureUploadController> _logger;
        private vibeContext vibedbContext = new vibeContext();

        public ProfilePictureUploadController(ILogger<ProfilePictureUploadController> logger)
        {
            _logger = logger;
        }


        [HttpPost("{id}")]
        public async Task<IActionResult> Post(List<IFormFile> files, int id) {

            long size = files.Sum(f => f.Length);
            var filePaths = new List<string>();
            Int32 unixTimestamp = (Int32)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1))).TotalSeconds;
            var folderPath = $@"{Environment.CurrentDirectory}/wwwroot";
            var uploadPath = $@"/Uploads/Profile/";
            int returnID = -1;

            

            foreach (var formFile in files) {
                
                if (formFile.Length > 0) {


                    if (Directory.Exists(folderPath+uploadPath)) {
                        var filePath = uploadPath + unixTimestamp + ".jpg";
                        var jPath = folderPath + filePath;

                        filePaths.Add(filePath);
                        using(var stream = new FileStream(jPath, FileMode.Create)) {
                            await formFile.CopyToAsync(stream);
                        }

                    }

                }

            }

            if (filePaths.Any()) {
                var proPic = new ProfilePicture {
                    PictureLocation = filePaths[0],
                    Hash = "521108dae80d6837885d167b484382e8c2303f19",
                    UserId = id
                };

                this.vibedbContext.Add(proPic);
                this.vibedbContext.SaveChanges();
                _logger.LogInformation("Uploaded: " + proPic.Id);

                // update the users table;
                var usersResult = this.vibedbContext.Users
                                    .First(u => u.Id == id);
                
                _logger.LogInformation("usersResult: " + usersResult.Picture);

                if (usersResult != null) {
                    usersResult.Picture = proPic.Id;
                    returnID = proPic.Id;

                    try {
                        this.vibedbContext.Update(usersResult);
                        this.vibedbContext.SaveChanges();
    
                        _logger.LogInformation("Done updating!");

                    } catch(Exception e) {
                        _logger.LogError("Error while updating: " + e);
                    }

                }

            }

            return Ok(new {
                count = files.Count,
                id = returnID,
                size,
                filePaths
            });

        }

        
    }
}
